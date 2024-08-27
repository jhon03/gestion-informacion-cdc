import { Component, ViewChild, OnInit} from '@angular/core';
import { MaterialModule } from '../../modules/material/material/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import * as jwt_decode from 'jwt-decode';

import { AuthenticacionService } from '../../../infrastructure/services/authenticacion/authenticacion.service';
import Swal from 'sweetalert2';
import { LoginRepository } from '../../../domain/repositories/login.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
userRole: string = '';

  
@ViewChild('sidenav') sidenav!: MatSidenav;

constructor(private loginRespository: LoginRepository, private router: Router){}
ngOnInit(): void {
    this.userRole;
}

getUserRole() {
  const token = localStorage.getItem('token');

 
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
