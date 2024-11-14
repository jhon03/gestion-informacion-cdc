import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRepository } from '../../../../../domain/repositories/login.repository';
import { loginRequest, loginResponse } from '../../../../../infrastructure/helpers/interfaces/login.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { mostrar, mostrarVariosTextos } from '../../../../../infrastructure/plugins/jwt/sweetalert/swal.plugin';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  private loginSuscripcion: Subscription|null = null;

  funciones = [

    "crear",
    "actualizar",
    "lista"
  ]

  loginForm: FormGroup = this.fb.group({
    nombreUsuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  })


  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginRepository: LoginRepository, private router: Router){}


  ngOnDestroy(): void {
   this.loginSuscripcion?.unsubscribe();
  }


  ngOnInit(): void {

  }

  get CurrentFormLogin(): loginRequest {
    const login = this.loginForm.value as loginRequest;
    return login;
  }

  onSubmit(): void {
    if (this.loginForm.invalid){

      this.loginForm.markAllAsTouched();
      return;
    }
    this.iniciarSesion();
  }
  redirigir(): void {

  }



  iniciarSesion(){

    this.loginSuscripcion = this.loginRepository.login(this.CurrentFormLogin).subscribe({
      next: ({body}: HttpResponse<loginResponse>) => {
        mostrar(`bienvenido ${body?.usuario.nombreColaborador}, 'usted esta logueado como: ' ${body?.usuario.nombreUsuario}`, 'correcto');
        this.router.navigateByUrl('dashboard')
      }, error: ({error}: HttpErrorResponse) => {

        if (error.msg && error.error) {
          mostrarVariosTextos(error.msg, error.error, 'error');
        } else {
          mostrar('error al iniciar sesión', 'error')
        }
      },
      })
  }
 usuarioLogeado(){

 }



}

