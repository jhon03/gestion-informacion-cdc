import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from '../../../../../infrastructure/services/colaborador/colaborador.service';
import { Subscription } from 'rxjs';
import { TipoIdentificacionDto } from '../../../../../infrastructure/dto/tipoIdentificacion.dto';
import { RolDto } from '../../../../../infrastructure/dto/rol.dto';
import { colaboradorRequest } from '../../../../../infrastructure/helpers/interfaces/colaborador.interface';
import { MaterialModule } from '../../../material/material/material.module';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-colaborador',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './actualizar-colaborador.component.html',
  styleUrl: './actualizar-colaborador.component.css'
})
export class ActualizarColaboradorComponent implements OnInit {

  idColaborador!: string;
  colaboradorForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private fb: FormBuilder
  ){


    this.colaboradorForm = this.fb.group({
      tipoIdentificacion: ['', [Validators.required]],
      numeroIdentificacion: ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
      nombreColaborador: ['', [Validators.minLength(3) ,Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(5)]],
      contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+-/#]).{8,}$'), Validators.minLength(8) ]],
      rol: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email] // Validación del campo email
    ]

    })

  }
  ngOnInit(): void {
  this.idColaborador = this.route.snapshot.paramMap.get('idColaborador')!;
  this.cargarDatosColaborador();
  }

  cargarDatosColaborador(){
    //Aquí deberías obtener los datos del colaborador usando su id
    this.colaboradorService.obtenerColaboradorById(this.idColaborador).subscribe({
      next: (colaborador) => {
        // Rellena el formulario con los datos del colaborador
        this.colaboradorForm.patchValue({
          nombreColaborador: this.colaborador.nombreColaborador || '',
          nombreUsuario: this.colaborador.nombreUsuario || '',
          numeroIdentificacion: this.colaborador.numeroIdentificacion || '', // Agrega el campo correspondiente
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos del colaborador:', error);
      },
    });
  }
 // Función para mostrar el snackbar
 showSnackBar(message: string): void {
  this.snackBar.open(message, 'Cerrar', {
    duration: 3000,
  });
}

 // Función para mostrar el error en un MatSnackBar
 showErrorSnackBar(message: string, errors: string[]): void {
  const errorMessage = `${message}\n${errors.join('\n')}`;
  this.snackBar.open(errorMessage, 'Cerrar', {
    duration: 5000,
    panelClass: ['snackbar-error']
  });
}


 public colaboradorSuscripcion: Subscription| null = null;
 public tipoIdentificacionSuscripcion: Subscription|null = null;
 public rolSuscripcion: Subscription| null = null;
 public tipoIdentificaciones: TipoIdentificacionDto[]|null = null;
 public roles: RolDto[]| null = null;
 public colaborador: colaboradorRequest= {tipoIdentificacion: "", numeroIdentificacion:0, nombreUsuario:"",nombreColaborador:"",contrasena:"", rol: "", email:""};


 actualizarColaborador(): void {
  if (this.colaboradorForm.valid){

    const colaboradorActualizado = this.colaboradorForm.value;
    this.colaboradorService.actualizarColaborador(this.idColaborador, colaboradorActualizado).subscribe({
      next: (response)=> {
        console.log('Respuesta del servidor:', response); // Verifica que la respuesta es la esperada

        if (response && response.msg) {
          Swal.fire({
            icon: 'success',
            title: 'Colaborador Actualizado',
            text: response.msg,  // Usa el mensaje de la respuesta
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir al gestionar colaboradores después de aceptar el mensaje
            this.router.navigate(['/usuarios/gestionar-colaboradores']);
          });

        //this.showSnackBar("ColaboradorActualizado exitosamente");
        //this.router.navigate(['/usuarios/gestionar-colaboradores']);
      } else {
        console.error('No se encontró el mensaje en la respuesta');
      }
    },
      error: (error)=> {

        this.showErrorSnackBar("Error al actualizar el colaborador", error.errors);
      }
    });
  }else {
    console.log('Formulario no válido');
  }

}

onSubmit(){
  //const idColaborador = '3352395f-9dac-49a4-8501-1c1fe2b2601c'; // Cambia esto según tu lógica
    this.colaboradorService.actualizarColaborador(this.idColaborador, this.colaboradorForm.value)
      .subscribe({
        next: (response) => {
          console.log('Colaborador actualizado:', response);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
        }
      });
}
}