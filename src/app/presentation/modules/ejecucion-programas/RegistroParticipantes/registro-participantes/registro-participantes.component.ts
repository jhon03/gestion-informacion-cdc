import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioProgramaService } from '../../../../../infrastructure/services/formPrograma/formulario-programa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material/material/material.module';
import { DiligenciarFormularioRequest, ResponseFormPrograma, Campo} from '../../../../../infrastructure/helpers/interfaces/formPrograma.interface';
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
  formularioBusqueda!: FormGroup;

  formularioForm: FormGroup = this.fb.group({});
  camposFormulario: Campo[] = [];
 error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioProgramaService,
    private authService: AuthenticacionService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef //inyección de ChangeDectectorRef para actualizar vista previa de un elemento modificado automaticamente
  ) {

    this.formularioBusqueda = this.fb.group({
     nombrePrograma: [''],
    });
  }

  ngOnInit(): void {


    }

//Método buscar formulario
buscarFormulario(): void {
  const nombrePorgrama = this.formularioBusqueda.get('nombrePrograma')?.value;
   if (!nombrePorgrama){
    this.error = 'Por favor. ingrese el nombre del programa';
    return;

   }
   this.formularioService.obtenerFormPrograma(nombrePorgrama).subscribe({
    next: (data: ResponseFormPrograma) => {
      this.error = null;
      //actualiza los campos del formulario
      this.camposFormulario = data.formulario.campos;

      this.camposFormulario.forEach((campo: Campo) => {
        this.formularioForm.addControl(campo.nombre, this.fb.control(''));

      });
      //forzar la detección de cambios
      this.cd.detectChanges();
    },

  error: (err) => {
    this.error = 'Error al buscar el formulario. Intente de nuevo.';
    console.error(err);

 // Forzar detección de cambios si ocurre un error
 this.cd.detectChanges();
  },
   });
  }


diligenciarFormulario(): void {
  if (this.formularioForm.valid) {
      const valores = Object.keys(this.formularioForm.value).map((campo) => ({
        nombreCampo: campo,
        valor: this.formularioForm.get(campo)?.value,
      }));


      const request: DiligenciarFormularioRequest = {
        nombrePrograma: this.formularioBusqueda.get('nombrePrograma')?.value,
        valores,
      };

      this.formularioService.diligenciarFormulario(request).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Formulario diligenciado',
            text: 'Los datos han sido guardados correctamente.',
          });
        },
        error: (err) => {

          if (err.status === 400 && err.error?.duplicados) {
            const duplicados = err.error.duplicados.map((dup: any) => `${dup.nombreCampo}: ${dup.valor}`).join(', ');
            Swal.fire({
              icon: 'error',
              title: 'Error de validación',
              text: `Uno o más valores ya existen en los datos diligenciados: ${duplicados}`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al diligenciar el formulario. Intente nuevamente.',
            });
          }
          console.error('Error al diligenciar formulario:', err);
          },
        });
      }else {
        this.error = 'Por favor complete todos los campos obligatorios.';
      }

  }

}
