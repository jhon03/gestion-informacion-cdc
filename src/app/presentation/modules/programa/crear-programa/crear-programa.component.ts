import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { programaRequest, responseProgram, tipoDato } from '../../../../infrastructure/helpers/interfaces/programa.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProgramaRepository } from '../../../../domain/repositories/programa.repository';
import { ColaboradorRepository } from '../../../../domain/repositories/colaborador.repository';

type tiposDato = 'string' | 'number';

interface Campo {
  nombreCampo: string;
  valor: string;
}

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrl: './crear-programa.component.css'
})


export class CrearProgramaComponent implements OnInit, OnDestroy{

  private programaSuscripcion: Subscription|null = null;

  public programa: programaRequest = {
    nombrePrograma:"",
    informacion: {}
  }

  tipoDatoOptions: { key: string, value: tiposDato }[] = [
    { key: 'String', value: 'string' },
    { key: 'Number', value: 'number' }
  ];

  programForm: FormGroup = this.fb.group({
    nombrePrograma: ['', Validators.required],
    informacion: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private programaRepository: ProgramaRepository,
    private colaboradorRepository: ColaboradorRepository
  ) {}

  ngOnDestroy(): void {
      this.programaSuscripcion?.unsubscribe();
  }

  ngOnInit(): void {

  }

  get curretProgram(): programaRequest {
    const program = this.programForm.value as programaRequest;
    return program;
  }

  get camposProgram(): FormArray {
    return this.programForm.get('informacion') as FormArray;
  }

  addField(): void {
    const fieldGroup = this.fb.group({
      nombreCampo: ['', Validators.required],
      valor: ['', Validators.required]
    });
    this.camposProgram.push(fieldGroup);
    this.cd.detectChanges();
  }

  deleteField(index: number): void {
    this.camposProgram.removeAt(index);
    this.cd.detectChanges();
  }

  onSubmit() {

    this.programForm.value.informacion.forEach( (campo:Campo) => {
      this.programa.informacion[campo.nombreCampo] = this.convertirANumero(campo.valor)
    });
    this.programa.nombrePrograma = this.curretProgram.nombrePrograma;
    console.log(this.programa);
    this.crearPrograma();
  }

  crearPrograma(){
    this.programaSuscripcion = this.programaRepository.crearProgram('00c173ba-1ec8-44b9-af35-c015d031cf63', this.programa).subscribe({
      next: ( {msg, programa} : responseProgram) => {
        console.log({msg});
        console.log({programa})
      },
      error: (error: Error) => console.log(error),
    })
  };

  //funcion para convertir un numero en caso de serlo a numero
  convertirANumero(valor: string): number|string {
    const numero = Number(valor);
    return isNaN(numero) ? valor : numero;
  }


  

}
