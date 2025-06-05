import { Component, ViewChild, OnInit} from '@angular/core';
import { MaterialModule } from '../../modules/material/material/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { AuthenticacionService } from '../../../infrastructure/services/authenticacion/authenticacion.service';
import Swal from 'sweetalert2';
import { LoginRepository } from '../../../domain/repositories/login.repository';
import { Router, RouterModule } from '@angular/router';
import { CrearNuevoProgramaComponent } from '../crear-nuevo-programa/crear-nuevo-programa.component';
import { FormRegistroUsuariosComponent } from '../form-registro-usuarios/form-registro-usuarios.component';
import { GestionarColaboradoresComponent } from '../usuarios/gestionar-colaboradores/gestionar-colaboradores.component';
import { VisualizarPogramasEnEsperaComponent } from '../../modules/formulacion/visualizar-pogramas-en-espera/visualizar-pogramas-en-espera.component';
import { ProgramasActivosComponent } from '../../modules/formulacion/programas-activos/programas-activos.component';
import { RegistrarNecesidadesComponent } from '../../modules/registro-necesidades/registrar-necesidades/registrar-necesidades.component';
import { VerNecesidadesRegistradasComponent } from '../../modules/registro-necesidades/ver-necesidades-registradas/ver-necesidades-registradas.component';
import { ProgramaDto } from '../../../infrastructure/dto/programa.dto';
import { ProgramaService } from '../../../infrastructure/services/programa/programa.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FormularioProgramaService } from '../../../infrastructure/services/formPrograma/formulario-programa.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CrearNuevoProgramaComponent,
    RouterModule,
    FormRegistroUsuariosComponent,
    GestionarColaboradoresComponent,
    VisualizarPogramasEnEsperaComponent,
    ProgramasActivosComponent,
    RegistrarNecesidadesComponent,
    VerNecesidadesRegistradasComponent,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  nombrePrograma: string = '';
  nombreEdad: Array<{ nombre: string; edad: string }> = [];
nombreEnfermedadParticipantes: Array<{ nombre: string; enfermedad: string }> = [];

nivelEducativoPorEdad: {
  edad: string;
  nivelEducativoPadre: string;
  nivelEducativoMadre: string;
}[] = [];



userRole: string = '';
programas: ProgramaDto[] = [];
programasFiltrados: ProgramaDto[] = [];
filtroPrograma: string= '';
page = 1;
  pageSize = 10;
  totalPages: number = 0;
  totalItems =0;
  dataSource: MatTableDataSource<ProgramaDto> = new MatTableDataSource();
@ViewChild('sidenav') sidenav!: MatSidenav;

constructor(private loginRespository: LoginRepository,
  private authService: AuthenticacionService, private router: Router, private programaService: ProgramaService, private formularioService: FormularioProgramaService

){}


ngOnInit(): void {
    this.userRole;
    this.getUserRole();

    this.obtenerProgramasActivos(this.page);

}
buscarFormularioPrograma(){
 if (!this.nombrePrograma.trim()) return;

  this.formularioService.obtenerFormPrograma(this.nombrePrograma.trim())
    .subscribe(response => {
          const formulario = response.formulario;

      if (formulario?.valoresDiligenciados) {
        this.nivelEducativoPorEdad = response.formulario.valoresDiligenciados.map(entry => {
          const valores = entry.valores;

          const edadPadre = valores.find(v => v.nombreCampo === 'Edad del padre')?.valor || '';
          const edadMadre = valores.find(v => v.nombreCampo === 'Edad de la madre')?.valor || '';
          const nivelPadre = valores.find(v => v.nombreCampo === 'Nivel educativo del padre')?.valor || '';
          const nivelMadre = valores.find(v => v.nombreCampo === 'Nivel educativo de la madre')?.valor || '';

          return {
            edad: `Padre: ${edadPadre} / Madre: ${edadMadre}`,
            nivelEducativoPadre: nivelPadre,
            nivelEducativoMadre: nivelMadre
          };
        });
// Nueva tabla: Nombre del niño y edad
        this.nombreEdad = formulario.valoresDiligenciados.map(entry => {
          const valores = entry.valores;
          const nombre = valores.find(v => v.nombreCampo === 'Nombre completo del niño(a)')?.valor || '';
          const edad = valores.find(v => v.nombreCampo === 'Fecha de nacimiento (o edad)')?.valor || '';

          return { nombre, edad };
        });

// Tabla 3: Nombre y enfermedad del participante
        this.nombreEnfermedadParticipantes = formulario.valoresDiligenciados.map(entry => {
          const valores = entry.valores;
          const nombre = valores.find(v => v.nombreCampo === 'Nombre del participante')?.valor || '';
          const enfermedad = valores.find(v => v.nombreCampo === '¿Tiene alguna enfermedad?')?.valor || '';
          return { nombre, enfermedad };
        });
      }
    });

  }

getUserRole(): void {

  this.userRole = this.authService.getUserRole();
  console.log('user Role: ', this.userRole);


}

cerrarSesion(){
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Tu sesión se cerrará!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.loginRespository.loggout();
      Swal.fire(
        'Sesión cerrada',
        'Has cerrado sesión correctamente.',
        'success'
      );
      this.router.navigate(['/login']);
    }
  });
}

obtenerProgramasActivos(page: number): void {

    this.programaService.obtenerProgramas(page, this.pageSize).subscribe({
      next: (res) => {
        this.programas = res.programas || [];
        this.programasFiltrados = [...this.programas]; // Inicializa los filtrados
        this.dataSource.data = this.programas;  // Se asigna la data a la MatTableDataSource
        const paginaInfo = res.pagina || '';
        const totalPages = parseInt(paginaInfo.split('de')[1].trim(), 10);
        this.totalPages = totalPages;

        if( res.tokenAccessRenovado){
          sessionStorage.setItem('tokenAcesso', res.tokenAccessRenovado);
        }
        const msg = res.msg || '';
        Swal.fire('Informacion', msg, 'info');
      },

      error: (err) => {
        Swal.fire('Error', 'No se pudieron obtener los programas', 'error');
        console.error(err);
      },
    });
  }
  // Navegación de la paginación
  cambiarPagina(nuevaPagina: number): void {
   if (nuevaPagina > 0 && nuevaPagina <= this.totalPages) {
      this.page = nuevaPagina;
      this.obtenerProgramasActivos(this.page);
    } else {
      Swal.fire('Aviso', 'No hay más páginas disponibles', 'info');
    }
}
   onPaginateChange(event: any): void {
  const nuevaPagina = event.pageIndex + 1; // Porque pageIndex empieza en 0
  this.cambiarPagina(nuevaPagina);
}
filtrarProgramas(): void {
  const filtro = this.filtroPrograma.trim().toLowerCase();
  this.programasFiltrados = this.programas.filter(p =>
    p.nombrePrograma.toLowerCase().includes(filtro)
  );
}

limpiarFiltro(): void {
  this.filtroPrograma = '';
  this.programasFiltrados = [...this.programas];
}

 irA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
