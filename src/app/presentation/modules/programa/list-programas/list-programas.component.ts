import { Component } from '@angular/core';
import { responsePrograms } from '../../../../infrastructure/helpers/interfaces/responses.interface';
import { ProgramaRepository } from '../../../../domain/repositories/programa.repository';
import { ProgramaDto } from '../../../../infrastructure/dto/programa.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-programas',
  templateUrl: './list-programas.component.html',
  styleUrl: './list-programas.component.css'
})
export class ListProgramasComponent {

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
      next: ({msg, programas}: responsePrograms ) => {
        console.log(programas)
        this.programas = programas;
      },
      error: (error:Error) => console.log(error),
    })
  }

}
