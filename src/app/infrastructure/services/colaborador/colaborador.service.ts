import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { colaboradorResponse, colaboradoresResponse } from '../../helpers/interfaces/responses.interface';
import { colaboradorRequest } from '../../helpers/interfaces/request.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private url : string = 'api/colaboradores'

  constructor(private http: HttpClient) { }

  obtenerColaboradores(): Observable<colaboradoresResponse>{
    return this.http.get<colaboradoresResponse>(`${this.url}/listColaboradores`);
  }

  obtenerColaboradorById(idColaborador: string): Observable <colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.url}/findById/${idColaborador}`);
  }

  crearColaborador(datos: colaboradorRequest): Observable<colaboradorResponse>{
    return this.http.post<colaboradorResponse>(`${this.url}/crear`, datos);
  }

  desactivarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.delete<colaboradorResponse>(`${this.url}/desactivar/${idColaborador}`);
  }

  activarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.url}/activar/${idColaborador}`);
  }

  actualizarColaborador(idColaborador: string, nombreColaborador: string): Observable<colaboradorResponse>{
    return this.http.put<colaboradorResponse>(`${this.url}/actualizar/${idColaborador}`, {nombreColaborador});
  }

  


}
