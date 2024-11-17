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
    ProgramasActivosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
userRole: string = '';


@ViewChild('sidenav') sidenav!: MatSidenav;

constructor(private loginRespository: LoginRepository,
  private authService: AuthenticacionService, private router: Router,

){}


ngOnInit(): void {
    this.userRole;
    this.getUserRole();
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
}
