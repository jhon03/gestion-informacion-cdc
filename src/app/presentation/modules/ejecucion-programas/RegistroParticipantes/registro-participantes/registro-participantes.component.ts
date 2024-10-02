import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioProgramaService } from '../../../../../infrastructure/services/formPrograma/formulario-programa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material/material/material.module';
import { DiligenciarFormularioRequest} from '../../../../../infrastructure/helpers/interfaces/formPrograma.interface';
import Swal from 'sweetalert2';

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
  idFormulario: string = 'cce24ebe-9769-4477-9254-2b8f3ec43a82';

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioProgramaService
  ) { }

  ngOnInit(): void {
    //SE OBTIENE EL FORMULARIO Y SUS CAMPOS DESDE EL BACKEND
    this.formularioService.obtenerFormularioPorId(this.idFormulario).subscribe(
      response => {
        this.camposFormulario = response.campos;
        this.initializeForm();
      },
    error => {
      console.error('Error al obtener el formulario', error);
    }
      
    );
  }

initializeForm(): void {
  const formGroupConfig: any = {};
  this.camposFormulario.forEach(campo => {
    formGroupConfig[campo.nombre] = [ '', campo.tipo === 'string' ? Validators.required : Validators.required];
  });

  this.formularioForm = this.fb.group(formGroupConfig);
}


  diligenciarFormulario(): void {
    if (this.formularioForm.invalid) {
      return;
    }

    const valores: DiligenciarFormularioRequest = {
      valores: this.camposFormulario.map(campo => ({
        nombreCampo: campo.nombre,
        valor: this.formularioForm.get(campo.nombre)?.value
      }))
    };

    //const idFormulario = 'a28f59c3-9ca8-4ec9-826c-74ef533bc556'; // Reemplaza esto con el ID real del formulario
    this.formularioService.diligenciarFormulario(this.idFormulario, valores).subscribe(
      response => {
        console.log('Formulario diligenciado correctamente:', response);
        // Aquí puedes mostrar un mensaje de éxito o redirigir al usuario

         // Mostrar el mensaje de éxito usando SweetAlert
         Swal.fire({
          title: '¡Formulario creado!',
          text: 'El formulario ha sido diligenciado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.formularioForm.reset();

      },
      error => {
        console.error('Error al diligenciar el formulario:', error);

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

