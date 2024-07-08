import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { colaboradorResponse, colaboradoresResponse } from '../../helpers/interfaces/colaborador.interface';
import { colaboradorRequest } from '../../helpers/interfaces/colaborador.interface';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private baseUrl: string = `${environments.baseUrl}/api/colaboradores`

  constructor(private http: HttpClient) { }

  obtenerColaboradores(): Observable<colaboradoresResponse>{
    return this.http.get<colaboradoresResponse>(`${this.baseUrl}/listColaboradores`);
  }

  obtenerColaboradorById(idColaborador: string): Observable <colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.baseUrl}/findById/${idColaborador}`);
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
