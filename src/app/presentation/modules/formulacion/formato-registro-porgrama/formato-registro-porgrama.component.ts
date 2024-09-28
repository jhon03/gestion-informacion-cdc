import { Component, OnInit } from '@angular/core';
import { FormArray, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material/material.module';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import { AuthenticacionService } from '../../../../infrastructure/services/authenticacion/authenticacion.service';
import { Colaborador } from '../../../../domain/models/colaborador.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formato-registro-porgrama',
  standalone: true,
  imports: [FormsModule,
    MaterialModule
  ],
  templateUrl: './formato-registro-porgrama.component.html',
  styleUrl: './formato-registro-porgrama.component.css'
})
export class FormatoRegistroPorgramaComponent  implements OnInit {
  nombrePrograma: string = '';
  programaForm: FormGroup;
  isLoading: boolean = false;

  constructor(private programaService: ProgramaService,
    private authService: AuthenticacionService, private fb: FormBuilder
  ){
    this.programaForm = this.fb.group({
      nombrePrograma: ['', Validators.required],
      informacion: this.fb.array([]) // FormArray para manejar campos dinámicos
    });

}
   
  // Obtener el FormArray
  get informacion(): FormArray {
    return this.programaForm.get('informacion') as FormArray;
  }
  //Agregar un nuevo campo al FormArray
  agregarCampo() {
    const nuevoCampo = this.fb.group({
      campo: ['', Validators.required], // Nombre del campo
      valor: ['', Validators.required]   // Valor del campo
    });
    this.informacion.push(nuevoCampo);
  }
  

  // Eliminar un campo del FormArray
  eliminarCampo(indice: number) {
    this.informacion.removeAt(indice);
  }

  ngOnInit(): void {
   
  }
  crearPrograma() {
    console.log('Botón Crear Programa clickeado');
    
    this.isLoading = true; // Mostrar el spinner

    const idColaborador = this.authService.getColaboradorId();
    if (!idColaborador) {
      console.error('ID del colaborador no encontrado');
      this.isLoading = false; // Ocultar el spinner
      return;
    }
    if (this.programaForm.valid) {
      //const idColaborador = this.authService.getColaboradorId(); // Obtener ID del colaborador autenticado
      
      if (this.programaForm.valid)
      // Llamar al servicio con el ID del colaborador y los datos del formulario
      this.programaService.crearPrograma(idColaborador, this.programaForm.value).subscribe(
        (response) => {
          console.log('Programa creado:', response);
          // Implementar lógica para notificación de éxito

          //Mensaje de éxito
          Swal.fire({
            title: 'Exito',
            text:'El programa ha sido creado exitosameente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          //limpiar formulario después de la creación
          this.programaForm.reset();
          this.informacion.clear();

          this.isLoading = false; // Ocultar el spinner
        },
        (error) => {
          console.error('Error al crear el programa:', error);
          // Implementar lógica para notificación de error

           // Mostrar mensaje de error con SweetAlert2
           Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el programa. Inténtelo nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          this.isLoading = false; // Ocultar el spinner
        } 
      );
    } else {
      this.isLoading = false; //ocultar el spinner si el formulario es inválido
    }
}
}
