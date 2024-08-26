import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { colaboradorRequest, colaboradorResponse} from '../../../../infrastructure/helpers/interfaces/colaborador.interface';
import { ColaboradorRepository } from '../../../../domain/repositories/colaborador.repository';
import { Subscription } from 'rxjs';
import { TipoIdentificacionRepository } from '../../../../domain/repositories/tipoIdentificacion.repositories';
import { tIdentificacionesResponse } from '../../../../infrastructure/helpers/interfaces/tipoIdentificacion.interface';
import { TipoIdentificacionDto } from '../../../../infrastructure/dto/tipoIdentificacion.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RolRespository } from '../../../../domain/repositories/rol.repository';
import { rolesResponse } from '../../../../infrastructure/helpers/interfaces/rol.interface';
import { RolDto } from '../../../../infrastructure/dto/rol.dto';
import { mostrar, mostrarVariosTextos } from '../../../../infrastructure/plugins/sweetalert/swal.plugin';

const col = {
  tipoIdentificacion: '',
  numeroIdentificacion: '',
  nombreColaborador: '',
  nombreUsuario: '',
  contrasena: '',
}


@Component({
  selector: 'app-crear-colaborador',
  templateUrl: './crear-colaborador.component.html',
  styleUrl: './crear-colaborador.component.css'
})

export class CrearColaboradorComponent implements OnDestroy, OnInit{

  public colaboradorSuscripcion: Subscription|null = null;
  public tipoIdentificacionSuscripcion: Subscription|null = null;
  public rolSuscripcion: Subscription| null = null;

  public tipoIdentificaciones: TipoIdentificacionDto[]|null= null;
  public roles: RolDto[]| null = null;
  public colaborador: colaboradorRequest= {tipoIdentificacion:"",numeroIdentificacion:0,nombreUsuario:"",nombreColaborador:"",contrasena:"", rol: ""};

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
            return '*este campo debe tener solo numeros';
          } else if(field === 'nombreColaborador'){
            return '*este campo debe tener solo letras';
          }
          return '*fallo al validar una expresion regular';
        case 'minlength':
          return `*EL campo debe tener minimo ${ errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  constructor(
    private colaboradorRepository: ColaboradorRepository, 
    private tipoIdentificacionRepository: TipoIdentificacionRepository,
    private rolRespository: RolRespository,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ){}

  public colaboradorForm: FormGroup = this.fb.group({
    tipoIdentificacion: ['', [Validators.required]],
    numeroIdentificacion: ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
    nombreColaborador: ['', [Validators.minLength(3) ,Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
    nombreUsuario: ['', [Validators.required, Validators.minLength(5)]],
    contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+-/#]).{8,}$'), Validators.minLength(8) ]],
    rol: ['', [Validators.required]],
  })

  
  
  get currentColaborador(): colaboradorRequest{
    const colaborador = this.colaboradorForm.value as colaboradorRequest;
    return colaborador;
  }

  onSubmit(): void {
    if(this.colaboradorForm.invalid) {
      this.colaboradorForm.markAllAsTouched();
        mostrar( "El formulario esta incompleto", "informacion");
        return;
    }
    this.crearColaborador();

  }

  crearColaborador(){
    this.colaboradorSuscripcion = this.colaboradorRepository.createColaborador(this.currentColaborador).subscribe({
      next: (res: colaboradorResponse) => {
        this.showSnackBar("colaborador creado correctamente")
        console.log(res);
        //this.colaboradorForm.reset({});
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
  };

  obtenerIdentificaciones(){
    this.tipoIdentificacionSuscripcion = this.tipoIdentificacionRepository.getIdentificacionsWithOutPagination().subscribe({
      next: (res: tIdentificacionesResponse) => {
        this.tipoIdentificaciones = res.Identificaciones,
        console.log(this.tipoIdentificaciones)
      },
      error: (error) => console.log(error),
    })
  }

  obtenerRoles(){
    this.rolSuscripcion = this.rolRespository.getRolsNotPagination().subscribe({
      next: ({msg, roles}: rolesResponse) => {
        this.roles = roles;
        console.log(this.roles)
      },
      error: (error) => console.log(error),
    })
  }

  //formas de mostrar mensajes
  showSnackBar(message: string) :void {
    this.snackBar.open( message, 'done', {
      duration: 2500,
    })
  }


    


}
