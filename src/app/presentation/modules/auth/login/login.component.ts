import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { loginRequest, loginResponse } from '../../../../infrastructure/helpers/interfaces/login.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRepository } from '../../../../domain/repositories/login.repository';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { mostrar, mostrarVariosTextos } from '../../../../infrastructure/plugins/sweetalert/swal.plugin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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

  constructor(
    private fb: FormBuilder,
    private loginRepository: LoginRepository,
    private router: Router,
  ){}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      this.loginSuscripcion?.unsubscribe();
  }

  get CurrentFormLogin(): loginRequest {
    const login = this.loginForm.value as loginRequest;
    return login;
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
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
        mostrar(`bienvenido ${body?.usuario.nombreUsuario} `, 'correcto');
        this.router.navigateByUrl('/mdl/colaborador/lista')
      }, error: ({error}: HttpErrorResponse) => {

        if(error.msg && error.error) {
          mostrarVariosTextos(error.msg, error.error, 'error');
        } else {
          mostrar('error al iniciar sesion', 'error');
        }
        
      },
    })
  }

  usuarioLogeador(){

  }

}
