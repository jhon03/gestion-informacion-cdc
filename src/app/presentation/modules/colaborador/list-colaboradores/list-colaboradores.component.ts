import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';
import { ColaboradorRepository } from '../../../../domain/repositories/colaborador.repository';
import { colaboradorResponse, colaboradoresResponse } from '../../../../infrastructure/helpers/interfaces/responses.interface';
import { ColaboradorDto } from '../../../../infrastructure/dto/colaborador.dto';

@Component({
  selector: 'app-list-colaboradores',
  templateUrl: './list-colaboradores.component.html',
  styleUrl: './list-colaboradores.component.css'
})
export class ListColaboradoresComponent implements OnInit, OnDestroy{

  private colaboradoresListSuscripcion: Subscription | null = null;
  colaboradores: ColaboradorDto[] = [];

  constructor( private colaboradorRepository: ColaboradorRepository){

  }

  ngOnInit(): void {
      this.obtenerColaboradores();
  }

  ngOnDestroy(): void {
      this.colaboradoresListSuscripcion?.unsubscribe();
  }

  obtenerColaboradores(){
    this.colaboradoresListSuscripcion = this.colaboradorRepository.getColaboradors().subscribe({
      next: ({msg, colaboradores}: colaboradoresResponse ) => {
        console.log(colaboradores)
        this.colaboradores = colaboradores;
      },
      error: (error:Error) => console.log(error),
    })
  }

}
