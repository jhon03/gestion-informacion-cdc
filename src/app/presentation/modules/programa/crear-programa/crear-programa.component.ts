import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { programaRequest, responseProgram, tipoDato } from '../../../../infrastructure/helpers/interfaces/programa.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProgramaRepository } from '../../../../domain/repositories/programa.repository';

type tiposDato = 'string' | 'number';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrl: './crear-programa.component.css'
})


export class CrearProgramaComponent implements OnInit, OnDestroy{

  private programaSuscripcion: Subscription|null = null;

  public programa: programaRequest = {
    nombrePrograma:"",
    formato:{}
  }

  tipoDatoOptions: { key: string, value: tiposDato }[] = [
    { key: 'String', value: 'string' },
    { key: 'Number', value: 'number' }
  ];

  programForm: FormGroup = this.fb.group({
    nombrePrograma: ['', Validators.required],
    formato: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private programaRepository: ProgramaRepository
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
    return this.programForm.get('formato') as FormArray;
  }

  addField(): void {
    const fieldGroup = this.fb.group({
      nombreCampo: ['', Validators.required],
      tipoDato: ['string', Validators.required]
    });
    this.camposProgram.push(fieldGroup);
    this.cd.detectChanges();
  }

  deleteField(index: number): void {
    this.camposProgram.removeAt(index);
    this.cd.detectChanges();
  }

  onSubmit() {
    console.log(this.programForm.value)
    this.programForm.value.formato.forEach( (campo:any) => {
      this.programa.formato[campo.nombreCampo] = campo.tipoDato;
    });
    this.programa.nombrePrograma = this.curretProgram.nombrePrograma;
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
  }


  

}
