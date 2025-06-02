import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { Subscription } from 'rxjs';
import { ProgramaRepository } from '../../../../domain/repositories/programa.repository';
import { responsePrograms } from '../../../../infrastructure/helpers/interfaces/programa.interface';
import { InformacionDTO, ProgramaDto } from '../../../../infrastructure/dto/programa.dto';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ColaboradorService } from'../../../../infrastructure/services/colaborador/colaborador.service';

@Component({
  selector: 'app-visualizar-pogramas-en-espera',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './visualizar-pogramas-en-espera.component.html',
  styleUrl: './visualizar-pogramas-en-espera.component.css'
})
export class VisualizarPogramasEnEsperaComponent implements OnInit  {
public sinProgramas: boolean = false; // NUEVA propiedad
  public programas: ProgramaDto[] = []; //lista de programas en espera
  public colaboradores: any[] = []; // Lista de colaboradores
  page = 1;
  pageSize = 10;
  cargando: boolean = true; // muestra el spinner mientras se cargan los programas
  displayedColumns: string[] = ['nombrePrograma', 'estado', 'informacion', 'fechaCreacion'];
  dataSource = new MatTableDataSource<ProgramaDto>([]); // Usamos MatTableDataSource aquí
  totalPages = 0;
  public programasSubscription: Subscription|null = null;


  constructor(
    private programaRepository: ProgramaRepository,
    private programaService: ProgramaService,
    private colaboradorService: ColaboradorService
  ){}


  ngOnInit(): void {
   this.obtenerProgramasEnEspera();
   this.obtenerColaboradoresConRol(this.page, this.pageSize);

  }



  obtenerProgramasEnEspera(): void{
    this.programaService.obtenerProgramasEnEspera(this.page, this.pageSize).subscribe({
      next: (res: any) => {

        this.programas = res.programas.map((programa: any)=>({
          ...programa,
          expanded: false
        }));
        this.sinProgramas = this.programas.length ===0;//marca si está vacío
        console.log(this.programas); // Verifica el formato de la información
        this.dataSource.data = this.programas; // Asignamos los datos a la tabla
        this.cargando = false;
      },
      error: (err) => {

        console.error(err);
        this.cargando = false;
      },

    });
  }
public isObject(value: any): value is InformacionDTO {
  return value && typeof value === 'object' && value.hasOwnProperty('campo') && value.hasOwnProperty('valor');
}

//métodos para controlar la navegación entre páginas
siguientePagina(): void {
  if (this.page < this.totalPages) {
    this.page++;
    this.obtenerProgramasEnEspera();
  }
}

paginaAnterior(): void {
  if (this.page > 1) {
    this.page--;
    this.obtenerProgramasEnEspera();
  }
}
  obtenerColaboradoresConRol(page: number, pageSize: number, callback?: () => void): void {
  this.colaboradorService.obtenerColaboradoresConRol(page, pageSize).subscribe({
    next: (res) => {
      // Filtrar solo los que tengan el rol "Líder de Proyectos"
      this.colaboradores = (res.colaboradores || []).filter(
        col => col.rol === 'LIDER DE PROYETOS'
      );

      this.page = page;
      this.totalPages = Math.ceil(res.total / pageSize);

      if (page > this.totalPages){
        Swal.fire('Aviso', 'NO HAY MÁS PÁGINAS DISPONIBLES', 'info');
        this.page = this.totalPages;
      }

      if (callback) callback(); // Vuelve a mostrar el modal con datos nuevos
    },
    error: (err) => {
      console.error('Error al obtener colaboradores con roles:', err);
      Swal.fire('Error', 'No se pudo obtener la lista de colaboradores.', 'error');
    },
  });
}

  activarPrograma(programa: ProgramaDto): void {
    this.programaService.activarPrograma(programa.id).subscribe({
      next: (res) => {
        programa.estado = 'ACTIVADO'; // Cambiar estado visualmente en la tabla
        Swal.fire('Activación', 'El programa ha sido activado', 'success');
      },
      error: (err) => Swal.fire('Error', ' No se pudo activar el programa', 'error'),
    });
  }
  confirmarActivacion(programa: ProgramaDto): void {
  if (programa.estado === 'ACTIVADO') return;

  let page = 1;

  const cargarYMostrarModal = () => {
    this.obtenerColaboradoresConRol(page, this.pageSize, () => {
      const opciones = this.colaboradores.map(colaborador => `
        <option value="${colaborador.idColaborador}">
          ${colaborador.nombreColaborador} - ${colaborador.rol}
        </option>
      `).join('');

      Swal.fire({
        title: '¿Deseas confirmar el programa?',
        html: `
          <label for="colaboradorResponsable">Asigne un Colaborador Responsable:</label>
          <select id="colaboradorResponsable" class="swal2-input">${opciones}</select><br>
          <button id="prevPage" class="swal2-styled">Anterior</button>
          <button id="nextPage" class="swal2-styled">Siguiente</button>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar y asignar líder',
        preConfirm: () => {
          const colaboradorId = (document.getElementById('colaboradorResponsable') as HTMLSelectElement).value;
          if (!colaboradorId) {
            Swal.showValidationMessage('El colaborador es obligatorio');
          }
          return colaboradorId;
        },
        didRender: () => {
          const prevBtn = document.getElementById('prevPage') as HTMLButtonElement;
          const nextBtn = document.getElementById('nextPage') as HTMLButtonElement;

          prevBtn.addEventListener('click', () => {
            if (page > 1) {
              page--;
              cargarYMostrarModal();
            }
            return false;//evita cierre de modal
          });

          nextBtn.addEventListener('click', () => {
            page++;
            cargarYMostrarModal();
          });
          return false; // evita cierre del modal
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const idColAsignado = result.value;

          const formato = {
            Nombre: 'string',
            numero_documento: 'number'
          };

          this.programaService.confirmarPrograma(programa.id, idColAsignado, formato).subscribe({
            next: () => {
              programa.estado = 'CONFIRMADO';
              programa.nombreColaboradorResponsable =
                this.colaboradores.find(col => col.idColaborador === idColAsignado)?.nombreColaborador || '';
              Swal.fire('Confirmación', 'El programa ha sido confirmado', 'success');
            },
            error: () => Swal.fire('Error', 'No se pudo confirmar el programa', 'error'),
          });
        }
      });
    });
  };

  cargarYMostrarModal(); // inicio
}
}
