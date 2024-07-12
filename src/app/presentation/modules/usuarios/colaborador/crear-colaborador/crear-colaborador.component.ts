import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-colaborador',
  templateUrl: './crear-colaborador.component.html',
  styleUrl: './crear-colaborador.component.css'
})
export class CrearColaboradorComponent implements OnDestroy, OnInit{

  public colaboradorSuscripcion: Subscription|null = null;
  public tipoIdentificacionSuscripcion: Subscription|null = null;

  tipoIdentificaciones: TipoIdentificacionDto[]|null= null;

  ngOnDestroy(): void {
      this.colaboradorSuscripcion?.unsubscribe();
      this.tipoIdentificacionSuscripcion?.unsubscribe();
  }

  ngOnInit(): void {
      this.obtenerIdentificaciones();
  }

  //inicializar objeto
  public colaborador: colaboradorRequest= {tipoIdentificacion:"",numeroIdentificacion:0,nombreUsuario:"",nombreColaborador:"",contrasena:""};
  
  //formulario reactivo
  public colaboradorForm = new FormGroup({
    tipoIdentificacion: new FormControl(''),
    numeroIdentificacion: new FormControl(''),
    nombreColaborador:new FormControl('', {nonNullable: true}),
    nombreUsuario: new FormControl(''),
    contrasena: new FormControl(''),
  });


  
  constructor(
    private colaboradorRepository: ColaboradorRepository, 
    private tipoIdentificacionRepository: TipoIdentificacionRepository,
    private snackBar: MatSnackBar
  ){}
  
  get currentColaborador(): colaboradorRequest{
    const colaborador = this.colaboradorForm.value as colaboradorRequest;
    return colaborador;
  }

  onSubmit(): void {
    if(this.colaboradorForm.invalid) return this.showAlert("El formulario esta incompleto", false);

    this.colaborador.tipoIdentificacion  = this.currentColaborador.tipoIdentificacion;
    this.colaborador.numeroIdentificacion = this.currentColaborador.numeroIdentificacion;
    this.colaborador.nombreColaborador = this.currentColaborador.nombreColaborador;
    this.colaborador.nombreUsuario = this.currentColaborador.nombreUsuario;
    this.colaborador.contrasena = this.currentColaborador.contrasena;
    this.crearColaborador();

  }

  crearColaborador(){
    this.colaboradorSuscripcion = this.colaboradorRepository.createColaborador(this.colaborador).subscribe({
      next: (res: colaboradorResponse) => {
        console.log(res)
      },
      error: ({error}) => {
        console.log(error.error);
      }
    })
  };

  obtenerIdentificaciones(){
    this.tipoIdentificacionSuscripcion = this.tipoIdentificacionRepository.getTipoIdentificaciones().subscribe({
      next: (res: tIdentificacionesResponse) => {
        this.tipoIdentificaciones = res.Identificaciones,
        console.log(this.tipoIdentificaciones)
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

  showAlert(message: string, paso: boolean = false): void {
    if(paso){
      Swal.fire({
        icon: 'success',
        title: message,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: message,
      })
    }
  }
    


}
