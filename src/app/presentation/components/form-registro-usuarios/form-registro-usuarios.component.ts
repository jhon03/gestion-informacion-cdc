import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({ 
  selector: 'app-form-registro-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './form-registro-usuarios.component.html',
  styleUrl: './form-registro-usuarios.component.css'
})
export class FormRegistroUsuariosComponent {

  constructor (private router: Router){}

  irCrearFormulario(): void {
    try {
      this.router.navigate(['/ejecucion/formulario-registro']);
      console.log('Navegación exitosa');
      }catch (error){
        console.error('Error en irRegistro de programa',error);
        
      }
  }

}
