import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { Subscription } from 'rxjs';
import { ProgramaRepository } from '../../../../domain/repositories/programa.repository';
import { responsePrograms } from '../../../../infrastructure/helpers/interfaces/programa.interface';
import { ProgramaDto } from '../../../../infrastructure/dto/programa.dto';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';


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

  public programas: ProgramaDto[] = []; //lista de programas en espera
  public colaboradores: any[] = []; // Lista de colaboradores
  page = 1;
  pageSize = 10;
  cargando: boolean = true; // muestra el spinner mientras se cargan los programas
  displayedColumns: string[] = ['nombrePrograma', 'estado', 'informacion', 'fechaCreacion'];
  dataSource = new MatTableDataSource<ProgramaDto>([]); // Usamos MatTableDataSource aquí

  public programasSubscription: Subscription|null = null;


  constructor(
    private programaRepository: ProgramaRepository,
    private programaService: ProgramaService,
    private colaboradorService: ColaboradorService
  ){}


  ngOnInit(): void {
   this.obtenerProgramasEnEspera();
   this.obtenerColaboradores(this.page, this.pageSize);
  }



  obtenerProgramasEnEspera(): void{
    this.programaService.obtenerProgramasEnEspera().subscribe({
      next: (res: any) => {
        this.programas = res.programas;
        console.log(this.programas); // Verifica el formato de la información
        this.dataSource.data = this.programas; // Asignamos los datos a la tabla
        this.cargando = false;
      },
      error: (err) => console.error(err),
    });
  }

  obtenerColaboradores(page: number, pageSize: number): void {
    this.colaboradorService.obtenerColaboradores(page, pageSize).subscribe({
      next: (res) => {
        this.colaboradores = res.body?.colaboradores || [];
       this.page = page;

       const msg = res.body?.msg || '';
        const totalColaboradores = parseInt(msg.split(' ')[2], 10);
        const totalPages = Math.ceil(totalColaboradores / pageSize);

        if (page > totalPages){
          Swal.fire('Aviso', 'NO HAY MÁS PÁGINAS DISPONIBLES', 'info');
          this.page = totalPages;
        }
      },
      error: (err) => console.error(err),
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
    if (programa.estado === 'ACTIVADO') {
      return; // Ya está activado, no hacer nada
    }

    const cargarColaboradores = (page: number) => {
      this.obtenerColaboradores(page, this.pageSize); // Obtenemos los colaboradores en función de la página actual
    };
    let page = 1;
    cargarColaboradores(page);

    //funtion para mostrar el modal
    const mostrarSwal = () => {

    
      Swal.fire({
        title: '¿Deseas confirmar el programa?',
        html: `
          <label for="colaboradorResponsable">Asigne un Colaborador Responsable:</label>
          <select id="colaboradorResponsable" class="swal2-input">
            ${this.colaboradores.map(colaborador => `
              <option value="${colaborador.id}">${colaborador.nombre}</option>
            `).join('')}
          </select>
          <br>
          <button id="prevPage" class="swal2-styled">Anterior</button>
          <button id="nextPage" class="swal2-styled">Siguiente</button>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
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
              cargarColaboradores(page);
              mostrarSwal(); // Volvemos a mostrar el modal con la lista actualizada
            }
          });
  
          nextBtn.addEventListener('click', () => {
            page++;
            cargarColaboradores(page);
            mostrarSwal(); // Volvemos a mostrar el modal con la lista actualizada
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const idColAsignado = result.value;
  
          //DEFINIR FORMATO PARA ENVIAR EL BODY
          const formato = {
            Nombre: 'string',
            numero_documento: 'number'
          };
          this.programaService.confirmarPrograma(programa.id, idColAsignado, formato).subscribe({
            next: (res) => {
              programa.estado = 'CONFIRMADO'; // Cambiar el estado del botón visualmente
              programa.nombreColaboradorResponsable = this.colaboradores.find(col => col.id === idColAsignado)?.nombre || '';
              Swal.fire('Confirmación', 'El programa ha sido confirmado', 'success');
            },
            error: (err) => Swal.fire('Error', 'No se pudo confirmar el programa', 'error'),
          });
        }
      });
    };
  
    mostrarSwal();
  }
}