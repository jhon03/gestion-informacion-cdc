import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';
import { ColaboradorRepository } from '../../../../domain/repositories/colaborador.repository';
import { colaboradorResponse, colaboradoresResponse } from '../../../../infrastructure/helpers/interfaces/colaborador.interface';
import { ColaboradorDto } from '../../../../infrastructure/dto/colaborador.dto';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { UserDto } from '../../../../infrastructure/dto/user.dto';
import { usersResponse } from '../../../../infrastructure/helpers/interfaces/user.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  public paginaAct: number = 1; //inicializamos en uno para cargar siempre la primera pagina
  public paginasDis: number = 1;


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
      this.colaboradoresListSuscripcion = this.colaboradorRepository.getColaboradors(this.paginaAct).subscribe({
        next: ({body}: HttpResponse<colaboradoresResponse> ) => {
          this.colaboradores = body?.colaboradores??[];
          this.paginaAct = body?.pagina ?? 1;
          this.paginasDis = body?.paginasDis?? 1;
        },
        error: (error:Error) => console.log(error),
      })
    }

  obtenerUsuarios(){
    this.usersSuscripcion = this.userRepository.getUsers(this.paginaAct).subscribe({
      next: ({msg, usuarios}: usersResponse) => {
        this.users = usuarios;
      },
      error: (error: Error) => console.log(error),
    })
  };

  turnPage(): void {
    this.paginaAct += 1;
    this.obtenerColaboradores();
    this.obtenerUsuarios();
  }

  turnBackPage(): void {
    this.paginaAct -= 1;
    this.obtenerColaboradores();
    this.obtenerUsuarios();
  }

}
