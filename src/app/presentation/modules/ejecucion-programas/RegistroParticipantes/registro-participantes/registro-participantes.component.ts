import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioProgramaService } from '../../../../../infrastructure/services/formPrograma/formulario-programa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material/material/material.module';
import { DiligenciarFormularioRequest} from '../../../../../infrastructure/helpers/interfaces/formPrograma.interface';
import Swal from 'sweetalert2';
import { AuthenticacionService } from '../../../../../infrastructure/services/authenticacion/authenticacion.service';

@Component({
  selector: 'app-registro-participantes',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './registro-participantes.component.html',
  styleUrl: './registro-participantes.component.css'
})
export class RegistroParticipantesComponent implements OnInit{
  formularioForm!: FormGroup;
  camposFormulario: any[] = [];
  idFormulario: string = '71fc31be-bbcd-44e1-a4d8-b581b6ea5863';
  //colaboradorId: string = '5c451cae-7229-42c8-b527-0f88ebe24554'; // Variable para almacenar el colaboradorId

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioProgramaService,
    private authService: AuthenticacionService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

    this.formularioForm = this.fb.group({
      colaboradorId: ['', Validators.required],
      idFormulario: ['', Validators.required],
      valores: this.fb.array([]) // Usar FormArray para campos dinámicos
    });
  }

  ngOnInit(): void {

    this.idFormulario = this.route.snapshot.paramMap.get('idFomulario') || this.idFormulario;
    this.formularioForm.patchValue({
    idFormulario: this.idFormulario
    });


  //SE OBTIENE EL FORMULARIO Y SUS CAMPOS DESDE EL BACKEND
    this.formularioService.obtenerFormularioPorId(this.idFormulario).subscribe(
      response => {
        this.camposFormulario = response.campos;
        this.initializeForm();
      },
    error => {
      console.error('Error al obtener el formulario', error);
    });


  }

initializeForm(): void {
  const formGroupConfig: any = {};
  this.camposFormulario.forEach(campo => {
    formGroupConfig[campo.nombre] = ['', Validators.required]; // Asegúrate de agregar validadores
  });
  this.formularioForm = this.fb.group(formGroupConfig);
}


  diligenciarFormulario(): void{


//VERIFICAR QUE el formulario es válido antes de enviarlo
if( this.formularioForm.invalid) {
  console.log(this.formularioForm.valid);  // Verificar si el formulario es válido
console.log(this.formularioForm.errors); // Verificar los errores del formulario
  this.snackBar.open('Por favor complete todos los campos obligatorios', 'Cerrar',{
    duration: 3000,
  });
  return;
}

const idColaborador = this.authService.getColaboradorId();
console.log('Colaborador ID enviado:', idColaborador); // Verifica si este ID es correcto

if (!idColaborador) {
  console.log('No se encontró el ID del colaborador');
  Swal.fire({
    title: 'Error',
    text: 'Hubo un error al encontrar el ID del colaborador. Intenta nuevamente.',
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
  return;
}

const valores = this.camposFormulario.map(campo => ({
  nombreCampo: campo.nombre,
  valor: this.formularioForm.get(campo.nombre)?.value
}));

const valoresDiligenciados: DiligenciarFormularioRequest = {

  idFormulario: this.idFormulario,
  colaboradorId: idColaborador, // Asegúrate de que este campo esté bien formado
  valores:valores
  };



this.formularioService.diligenciarFormulario( idColaborador, this.idFormulario, valoresDiligenciados).subscribe(
  response => {
    console.log('Formulario diligenciado correctamente', response);
    Swal.fire({
      title: '¡Formulario creado!',
      text: 'El formulario ha sido diligenciado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
this.formularioForm.reset();
  },
  error => {
    console.error('Error al diligenciar el formulario', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al diligenciar el formulario. Intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
);
}
}