import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-nuevo-programa',
  standalone: true,
  imports: [],
  templateUrl: './crear-nuevo-programa.component.html',
  styleUrl: './crear-nuevo-programa.component.css'
})
export class CrearNuevoProgramaComponent {

  constructor(private router: Router){}


  irRegistroPrograma(): void {

    try {
    this.router.navigate(['/formulacion/registro-programa']);
    console.log('Navegación exitosa');
    }catch (error){
      console.error('Error en irRegistro de programa',error);
      
    }
  }
}
