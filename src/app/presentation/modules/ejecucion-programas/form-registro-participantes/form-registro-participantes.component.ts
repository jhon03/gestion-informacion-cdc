import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import { Programa } from '../../../../domain/models/programa.models';

import { MaterialModule } from '../../material/material/material.module';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormularioProgramaService } from '../../../../infrastructure/services/formPrograma/formulario-programa.service';
import { AuthenticacionService } from '../../../../infrastructure/services/authenticacion/authenticacion.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-registro-participantes',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './form-registro-participantes.component.html',
  styleUrl: './form-registro-participantes.component.css'
})
export class FormRegistroParticipantesComponent implements OnInit {


  //código para listar los prgramas
  //variable que almacena los programas activos
  programas: Programa[]=[];


  //selectedProgramaId: string = '';
  selectedProgramaNombre: string = ''; //seleccionar por nombre de programa
  page: number = 1;
  limit: number = 10;
  isSubmitting = false;

  //Formulario reactivo
  formularioProgramaForm: FormGroup;

  constructor( private programaService: ProgramaService,
               private fb: FormBuilder,
               private formProgramaService: FormularioProgramaService,
               private authService: AuthenticacionService,
               private snackBar: MatSnackBar
  ) {

    this.formularioProgramaForm = this.fb.group({
      nombrePrograma: ['',  Validators.required],
      campos: this.fb.array([])
    });
  }


  ngOnInit(): void {

this.ObtenerProgramasActivos() //cargar programas activos

  }

   ObtenerProgramasActivos(page: number = 1, acumulador: Programa[] = []): void {
  this.programaService.obtenerProgramas(page, this.limit).subscribe({
     next: (response)=> {
       const programasActivos = response.programas.filter(p => p.estado === 'ACTIVO');
        const nuevosAcumulados = [...acumulador, ...programasActivos];

        if (response.programas.length === this.limit) {
          this.ObtenerProgramasActivos(page + 1, nuevosAcumulados);
        } else {
          this.programas = nuevosAcumulados;
          console.log('Programas activos cargados:', this.programas);
        }
      },
      error: (error) => {
        console.error('Error al obtener los programas:', error);
        this.snackBar.open('Error al cargar los programas', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }



 get campos():FormArray{
  return this.formularioProgramaForm.get('campos') as FormArray;
 }

 //Agregar nuevo campo
 agregarCampo(){
  try {
    const campoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.campos.push(campoForm);
    console.log(this.campos); // Verifica si los campos se están agregando

  //verifica el estado del Array, para revisar errores que puedan ocurrir con los controles del formulario
    console.log(this.formularioProgramaForm.get('campos'));

  } catch (error) {
    console.error('Error al agregar un campo:', error);
  }
 }

 //ELIMINAR CAMPO
 eliminarCampo(index: number){
  this.campos.removeAt(index);
 }
onSubmit(): void{
  console.log(this.formularioProgramaForm.value);
    const colaboradorId = this.authService.getColaboradorId();

    if (!colaboradorId) {

      //muestra mensaje visual para el usuario en caso se no encontrar el id del colaborador.
      this.snackBar.open('ID del colaborador no encontrado. Por favor, inicia sesión nuevamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.formularioProgramaForm.invalid || this.campos.length === 0) {
      this.snackBar.open('El formulario es inválido o o no tiene campos. Revisa los campos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.isSubmitting = true;

    console.log(this.formularioProgramaForm.value); // Para ver el valor enviado

    this.formProgramaService.crearFormularioPrograma(colaboradorId, this.formularioProgramaForm.value).subscribe(response => {
      this.isSubmitting = false;
      //Mensaje de éxito
Swal.fire({
  title: 'Exito',
  text:'El formulario para el programa ha sido creado exitosameente',
  icon: 'success',
  confirmButtonText: 'Aceptar'
});

  },
  error => {
    this.isSubmitting = false;
    this.snackBar.open(error.message, 'Cerrar',{
      duration: 3000,
      panelClass: ['error-snackbar']
    })

  }

);
}



 }

