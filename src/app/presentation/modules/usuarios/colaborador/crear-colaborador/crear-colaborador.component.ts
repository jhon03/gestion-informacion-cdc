import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { colaboradorRequest, colaboradorResponse, colaboradoresResponse } from '../../../../../infrastructure/helpers/interfaces/colaborador.interface';

import { Subscription } from 'rxjs';
import { TipoIdentificacionDto } from '../../../../../infrastructure/dto/tipoIdentificacion.dto';
import { TipoIdentificacionRepository } from '../../../../../domain/repositories/tipoIdentificacion.repositories';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { tIdentificacionesResponse } from '../../../../../infrastructure/helpers/interfaces/tipoIdentificacion.interface';

import { RolDto } from '../../../../../infrastructure/dto/rol.dto';
//import { RolRespository } from '../../../../../domain/repositories/rol.repository';
import { RolRepositoryImpl } from '../../../../../infrastructure/repositoryImpl/rol.repositoryImpl';
import { rolesResponse } from '../../../../../infrastructure/helpers/interfaces/rol.interface';
import { ColaboradorRepository} from '../../../../../domain/repositories/colaborador.repository';

import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { mostrar, mostrarVariosTextos } from '../../../../../infrastructure/plugins/jwt/sweetalert/swal.plugin';
import { ColaboradorService } from '../../../../../infrastructure/services/colaborador/colaborador.service';
import { ActivatedRoute, Router} from '@angular/router';
const col = {
  tipoIdentificacion: '',
  numeroIdentificacion: '',
  nombreColaborador: '',
  nombreUsuario: '',
  contrasena: '',


}
@Component({
  selector: 'app-crear-colaborador',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './crear-colaborador.component.html',
  styleUrl: './crear-colaborador.component.css',
})
export class CrearColaboradorComponent implements OnInit, OnDestroy {


  idColaborador!: string;
  hide = signal(true);
  showAlert: any;
  //showSnackBar: any;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  constructor(

    private tipoidentificacionRepository: TipoIdentificacionRepository,
    private fb: FormBuilder, //faltaba la inyecccion del formbuider
    private rolRepository: RolRepositoryImpl,
    private colaboradorRepository: ColaboradorRepository,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private colaboradorService: ColaboradorService,
    private router: Router
  ){

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
  //faltaba la inicializacion del formulario reactivo
  public colaboradorForm: FormGroup = this.fb.group({
    tipoIdentificacion: ['', [Validators.required]],
    numeroIdentificacion: ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
    nombreColaborador: ['', [Validators.minLength(3) ,Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
    nombreUsuario: ['', [Validators.required, Validators.minLength(5)]],
    contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+-/#]).{8,}$'), Validators.minLength(8) ]],
    rol: ['', [Validators.required]]

  })


 public colaboradorSuscripcion: Subscription| null = null;
  public tipoIdentificacionSuscripcion: Subscription|null = null;
  public rolSuscripcion: Subscription| null = null;
  public tipoIdentificaciones: TipoIdentificacionDto[]|null = null;
  public roles: RolDto[]| null = null;
  public colaborador: colaboradorRequest= {tipoIdentificacion: "", numeroIdentificacion:0, nombreUsuario:"",nombreColaborador:"",contrasena:"", rol: ""};

  public mostrarContrasena : boolean = false;

  ngOnDestroy(): void {
    this.colaboradorSuscripcion?.unsubscribe();
      this.tipoIdentificacionSuscripcion?.unsubscribe();
      this.rolSuscripcion?.unsubscribe();
  }

  ngOnInit(): void {

    this.colaboradorForm.reset(col);
    this.obtenerIdentificaciones();
    this.obtenerRoles();

    //recuperar estado del colaborador seleccionado
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['colaborador']) {
      const colaborador = state['colaborador'];
      this.colaboradorForm.patchValue({
        tipoIdentificacion: colaborador.tipoIdentificacion,
      numeroIdentificacion: colaborador.numeroIdentificacion,
      nombreColaborador: colaborador.nombreColaborador,
      nombreUsuario: colaborador.nombreUsuario,
      rol: colaborador.rol,
      });
    }
  }

  actualizarColaborador(): void {
    if (this.colaboradorForm.valid){

      const colaboradorActualizado = this.colaboradorForm.value;
      this.colaboradorService.actualizarColaborador(this.idColaborador, colaboradorActualizado).subscribe({
        next: (response)=> {
          this.showSnackBar("ColaboradorActualizado exitosamente");
          this.router.navigate(['/usuarios/gestionar-colaboradores']);
        },
        error: (error)=> {
          this.showErrorSnackBar("Error al actualizar el colaborador", error.errors);
        }
      });
    }


  }


  get currentColaborador(): colaboradorRequest{
    const colaborador = this.colaboradorForm.value as colaboradorRequest;
    return colaborador;
  }
  onSubmit(){
    if(this.colaboradorForm.invalid) {
      this.colaboradorForm.markAllAsTouched();
      mostrar ("el formulario esta incompleto", "informacion");
      return;


    }

    console.log("Datos enviados:", this.currentColaborador);
   // this.crearColaborador();

    this.colaboradorSuscripcion = this.colaboradorRepository.createColaborador(this.currentColaborador).subscribe({
      next: (res: colaboradorResponse) => {
          this.showSnackBar("Colaborador creado correctamente");
          console.log(res);
      },
     // En el manejo del error
error: (error) => {
  console.log(error);
  if(error.error && error.error.message && error.error.errors) {

    this.showErrorSnackBar(error.error.message, error.error.errors);
  } else {

    this.showErrorSnackBar('Error al crear el colaborador', ['Ocurrió un error inesperado']);
  }


}


  });


  }
  crearColaborador() {
    this.colaboradorSuscripcion = this.colaboradorRepository.createColaborador(this.currentColaborador).subscribe({
      next: (res: colaboradorResponse) => {
       this.showSnackBar("colaborador creado correctamente");
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        if(error.msg && error.errro){
          mostrarVariosTextos(error.msg, error.error, 'error');
        } else {
          mostrar('Error al crear el colaborador', 'error');
        }
      }
      })
    }
  isValidField( field: string): boolean| null{
   return this.colaboradorForm.controls[field].errors
   && this.colaboradorForm.controls[field].touched;

  }
  getFieldError(field: string): string | null {
     if( !this.colaboradorForm.controls[field] ) return null;


     const errors = this.colaboradorForm.controls[field].errors || {};
     for(const key of Object.keys(errors)){

      switch (key) {
        case 'required':
          return '*este campo es requerido';

          case 'pattern':
            if(field === 'numeroIdentificacion'){
              return '*este campo debe tener solo números';


            } else if(field === 'nombreColaborador'){
              return '*este campo debe tener solo letras'
            }
            return '*fallo al validar una expresión regular';

            case 'minlenght':
              return `*EL campo debe tener minimo ${ errors['minlength'].requiredLength} caracteres`;

      }
     }
     return null;

  }
    obtenerIdentificaciones(){
      this.tipoIdentificacionSuscripcion = this.tipoidentificacionRepository.getIdentificacionsWithOutPagination().subscribe({
        next: (res: tIdentificacionesResponse)=> {
          this.tipoIdentificaciones = res.Identificaciones,
          console.log(this.tipoIdentificaciones)
        },
        error: (error) => console.log(error),})
    }
obtenerRoles(){
  this.rolSuscripcion = this.rolRepository.getRolsNotPagination().subscribe({
    next: ({msg, roles}: rolesResponse)=>  {
        this.roles = roles;
        console.log(this.roles)
    },
    error: (error) => console.log(error),

  })
}



}







    /*this.colaborador.tipoIdentificacion  = this.currentColaborador.tipoIdentificacion;
    this.colaborador.numeroIdentificacion = this.currentColaborador.numeroIdentificacion;
    this.colaborador.nombreColaborador = this.currentColaborador.nombreColaborador;
    this.colaborador.nombreUsuario = this.currentColaborador.nombreUsuario;
    this.colaborador.contrasena = this.currentColaborador.contrasena;
    this.colaborador.rol = this.currentColaborador.rol;
    this.crearColaborador();
    //this.colaboradorForm.reset(col);
    console.log(this.colaborador)*/