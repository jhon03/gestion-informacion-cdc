import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tipoIdentificacion } from '../../../../infrastructure/helpers/interfaces/colaborador.interface';


@Component({
  selector: 'app-crear-colaborador',
  templateUrl: './crear-colaborador.component.html',
  styleUrl: './crear-colaborador.component.css'
})
export class CrearColaboradorComponent{

  //formulario reactivo
  public colaboradorForm = new FormGroup({
    tipoIdentificacion: new FormControl<tipoIdentificacion>(tipoIdentificacion.CE),
    numeroIdentificacion: new FormControl(0),
    nombreColaborador:new FormControl('', {nonNullable: true}),
    nombreUsuario: new FormControl(''),
    contrasena: new FormControl(''),
  });

  

  public publishers = [
    { id: tipoIdentificacion.CE, desc: 'Cedula Ciudadania' },
    { id: tipoIdentificacion.TI, desc: 'Targeta Identidad' },
  ];


}
