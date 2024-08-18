import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { loginRequest, loginResponse } from '../../../../infrastructure/helpers/interfaces/login.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRepository } from '../../../../domain/repositories/login.repository';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  private loginSuscripcion: Subscription|null = null;

  loginForm: FormGroup = this.fb.group({
    nombreUsuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private loginRepository: LoginRepository,
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

  iniciarSesion(){
    this.loginSuscripcion = this.loginRepository.login(this.CurrentFormLogin).subscribe({
      next: ({body}: HttpResponse<loginResponse>) => {
        console.log(body?.usuario),
        console.log(body?.tokenAcesso);
      }, error: (error: Error) => console.log(error),
    })
  }

  usuarioLogeador(){

  }

}
