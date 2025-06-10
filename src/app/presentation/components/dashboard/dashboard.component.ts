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

//Interface de listar item en menú(ngFor)
interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  roles: string[];
}
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


menuAbierto = true;
userRole: string = '';
menuItems: MenuItem[] = [];

programas: ProgramaDto[] = [];

private allMenuItems: MenuItem[] = [
    { label: 'Necesidades', route: '/dashboard/iniciacion/ver-necesidades', roles: ['DIRECTORA '] },
    { label: 'Asistencias', route: '/dashboard/consultar-asistencias', roles: ['DIRECTORA '] },
    { label: 'Total Asistentes', route: '/dashboard/total-asistentes-por-actividad', roles: ['DIRECTORA '] },

    { label: 'Reportes', route: '/dashboard/reportes/caracterizacion', roles: ['DIRECTORA '] },
    { label: 'Registrar Necesidades', route: '/dashboard/iniciacion/registrar-necesidades', icon: 'post_add', roles: ['DIRECTORA '] },
    { label: 'Programas Activos', route: '/dashboard/formulacion/ver-programas-activos', icon: 'fact_check', roles: ['DIRECTORA ', ' LIDER DE PROYETOS '] },
    { label: 'Crear Formulario para Inscripción', route: '/dashboard/ejecuccion/formulario-registro', roles: ['DIRECTORA '] },
    { label: 'Actividades', route: '/dashboard/ejecuccion/ver-planeacion', icon: 'visibility', roles: ['DIRECTORA '] },
     { label: 'Programas sin confirmar', route: '/dashboard/formulacion/ver-programas-en-espera', roles: ['DIRECTORA '] },
    { label: 'Colaboradores', route: '/dashboard/gestionar-colaboradores', roles: ['SUPERUSER'] },
    { label: 'Crear Programas', route: '/dashboard/iniciacion/ver-necesidades', icon: 'post_add', roles: [' PROFESIONAL DE PROYECTOS'] },
    { label: 'Registrar Participante', route: '/dashboard/ejecuccion/registro-participantes', roles: [' LIDER DE PROYETOS '] },
    { label: 'Subir planeación', route: '/dashboard/ejecuccion/subir-archivos', icon: 'post_add', roles: [' LIDER DE PROYETOS '] },
    { label: 'Ver Actividades', route: '/dashboard/ejecuccion/ver-planeacion', roles: [' LIDER DE PROYETOS '] },
    { label: 'Registrar Asistencia', route: '/dashboard/ejecuccion/registrar-asistencia', icon: 'assignment_turned_in', roles: [' LIDER DE PROYETOS '] }
  ];


constructor(private loginRespository: LoginRepository,
  private authService: AuthenticacionService, private router: Router, private programaService: ProgramaService, private formularioService: FormularioProgramaService

){}


ngOnInit(): void {

    this.getUserRole();


}


getUserRole(): void {

  this.userRole = this.authService.getUserRole();
  console.log('user Role: ', this.userRole);
 this.menuItems = this.allMenuItems.filter(item => item.roles.includes(this.userRole));

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


}
