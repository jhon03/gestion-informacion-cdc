import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { colaboradorResponse, colaboradoresResponse } from '../../helpers/interfaces/colaborador.interface';
import { colaboradorRequest } from '../../helpers/interfaces/colaborador.interface';
import { environments } from '../../../../environments/environments';
import { loginResponse } from '../../helpers/interfaces/login.interface';
import { TokenRepository } from '../../../domain/repositories/token.repository';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private baseUrl: string = `${environments.baseUrl}/api/colaboradores`

  constructor(
    private tokenRepository: TokenRepository,
    private http: HttpClient,
  ) { }

  obtenerColaboradores(page: number): Observable<HttpResponse<colaboradoresResponse> >{
    return this.http.get<colaboradoresResponse>(
      `${this.baseUrl}/listColaboradores?page=${page}`, 
      { observe: 'response' 
    }).pipe( tap( ({body}: HttpResponse<colaboradoresResponse>) => {
      if(body?.tokenAcessoRenovado){
        this.tokenRepository.PutTokenInBrowser(body.tokenAcessoRenovado);
      }
    }))
  }

  obtenerColaboradorById(idColaborador: string): Observable <HttpResponse<colaboradorResponse>>{
    return this.http.get<colaboradorResponse>(`${this.baseUrl}/findById/${idColaborador}`,{
      observe: 'response'
    }).pipe( tap(({body}: HttpResponse<colaboradorResponse>)  => {
      if(body?.tokenAcessoRenovado){
        this.tokenRepository.PutTokenInBrowser(body.tokenAcessoRenovado);
      }
    }));
  }

  crearColaborador(datos: colaboradorRequest): Observable<colaboradorResponse>{
    return this.http.post<colaboradorResponse>(`${this.baseUrl}/crear`, datos);
  }

  desactivarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.delete<colaboradorResponse>(`${this.baseUrl}/desactivar/${idColaborador}`);
  }

  activarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.baseUrl}/activar/${idColaborador}`);
  }

  actualizarColaborador(idColaborador: string, nombreColaborador: string): Observable<colaboradorResponse>{
    return this.http.put<colaboradorResponse>(`${this.baseUrl}/actualizar/${idColaborador}`, {nombreColaborador});
  }

  


}
