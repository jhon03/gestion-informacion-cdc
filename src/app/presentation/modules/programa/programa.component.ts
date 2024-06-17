import { Component, OnDestroy, OnInit } from '@angular/core';
import { Programa } from '../../../domain/entities/programa.model';
import { ProgramaRepository } from '../../../domain/repositories/programa.repository';
import { Subscription } from 'rxjs';
import { ProgramaDto } from '../../../infrastructure/dto/programa.dto';
import { responseProgram } from '../../../infrastructure/helpers/interfaces/responses.interface';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrl: './programa.component.css'
})
export class ProgramaComponent {

  private programasSuscripcion: Subscription | null = null;

  programas: ProgramaDto[] = [];

  constructor( private programaRepository: ProgramaRepository){
  }

  ngOnInit(): void {
    this.obtenerProgramas();
  }

  ngOnDestroy(): void {
      this.programasSuscripcion?.unsubscribe();
  }

  obtenerProgramas(){
    this.programasSuscripcion = this.programaRepository.getPrograms().subscribe({
      next: ({msg, programas}: responseProgram ) => {
        console.log(programas)
        this.programas = programas;
      },
      error: (error:Error) => console.log(error),
    })
  }
}
