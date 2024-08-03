import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';
import { ColaboradorRepository } from '../../../../domain/repositories/colaborador.repository';
import { colaboradorResponse, colaboradoresResponse } from '../../../../infrastructure/helpers/interfaces/colaborador.interface';
import { ColaboradorDto } from '../../../../infrastructure/dto/colaborador.dto';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { UserDto } from '../../../../infrastructure/dto/user.dto';
import { usersResponse } from '../../../../infrastructure/helpers/interfaces/user.interface';

@Component({
  selector: 'app-list-colaboradores',
  templateUrl: './list-colaboradores.component.html',
  styleUrl: './list-colaboradores.component.css'
})
export class ListColaboradoresComponent implements OnInit, OnDestroy{

  private colaboradoresListSuscripcion: Subscription | null = null;
  private usersSuscripcion: Subscription | null = null;
  public colaboradores: ColaboradorDto[] = [];
  public users: UserDto[] = [];


  constructor( 
    private colaboradorRepository: ColaboradorRepository,
    private userRepository: UserRepository
  ){}

  ngOnInit(): void {
      this.obtenerColaboradores();
      this.obtenerUsuarios();
  }

  ngOnDestroy(): void {
      this.colaboradoresListSuscripcion?.unsubscribe();
      this.usersSuscripcion?.unsubscribe();
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

  obtenerUsuarios(){
    this.usersSuscripcion = this.userRepository.getUsers().subscribe({
      next: ({msg, usuarios}: usersResponse) => {
        console.log(usuarios);
        this.users = usuarios;
      },
      error: (error: Error) => console.log(error),
    })
  }

}
