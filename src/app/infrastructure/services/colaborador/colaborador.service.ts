import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../../../domain/models/colaborador.models';
import { environment } from '../../../../enviroments/enviroment';
import { colaboradorResponse, colaboradoresResponse } from '../../helpers/interfaces/colaborador.interface';
import { colaboradorRequest } from '../../helpers/interfaces/colaborador.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apiUrl = environment.apiUrl;
  
  private endpoint: string = `${environment.apiUrl}/api/colaboradores`;

  constructor(private http: HttpClient) { }


  obtenerColaboradores(): Observable<colaboradoresResponse>{
    return this.http.get<colaboradoresResponse>(`${this.apiUrl}/listColaboradores`);
  }

  obtenerColaboradorById(idColaborador: string): Observable <colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.apiUrl}/findById/${idColaborador}`);
  }

  crearColaborador(colaborador: colaboradorRequest): Observable<colaboradorResponse>{
    return this.http.post<colaboradorResponse>(`${this.endpoint}/crear`, colaborador);
  }
  desactivarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.delete<colaboradorResponse>(`${this.apiUrl}/desactivar/${idColaborador}`);
  }

  activarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.apiUrl}/activar/${idColaborador}`);
  }

  actualizarColaborador(idColaborador: string, nombreColaborador: string): Observable<colaboradorResponse>{
    return this.http.put<colaboradorResponse>(`${this.apiUrl}/actualizar/${idColaborador}`, {nombreColaborador});
  }

  }



