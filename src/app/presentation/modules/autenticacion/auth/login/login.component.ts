import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticacionService } from '../../../../../infrastructure/services/authenticacion/authenticacion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthenticacionService, private router: Router){}

  
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required], 
        password: ['', Validators.required]
      });
  }

  onSubmit() {
    if (this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          console.log('login exitoso', response);

          //se guarda el token el localStorage
          localStorage.setItem('token', response.token);
          this.router.navigate(['/usuarios/administracion-usuarios']);

        },
        error => {
          console.error('error al iniciar sesión', error);
          this.errorMessage = error.error?.error || 'credenciales no válidas'
          
        }
      );
    } else {
      console.log("formulario no válido")
    }
  }



}
