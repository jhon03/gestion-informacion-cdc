import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { responseProgram, responsePrograms } from '../../helpers/interfaces/programa.interface';
import { programaRequest } from '../../helpers/interfaces/programa.interface';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private baseUrl: string = `${environments.baseUrl}/api/programa`

  constructor(private http: HttpClient) { }

  obtenerProgramas(): Observable<responsePrograms>{
    return this.http.get<responsePrograms>(`${this.baseUrl}/obtenerProgramas`)
  }

  obtenerProgramaById(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.baseUrl}/${idPrograma}`)
  }
  obtenerProgramasEnEspera(): Observable<responsePrograms>{
    return this.http.get<responsePrograms>(`${this.baseUrl}/obtenerProgramasConfirmacion`);
  }

  activarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.baseUrl}/activar/${idPrograma}`);
  }

  actualizarPrograma(idPrograma: string, datos: programaRequest): Observable<responseProgram>{
    return this.http.put<responseProgram>(`${this.baseUrl}/actualizar/${idPrograma}`, datos)
  }

  crearPrograma(idColaborador: string, datos: programaRequest): Observable<responseProgram>{
    return this.http.post<responseProgram>(`${this.baseUrl}/${idColaborador}/crearPrograma`, datos);
  }

  desactivarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.baseUrl}/desactivar/${idPrograma}`);
  }

  confirmarPrograma(idPrograma: string, idColAsignado: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.baseUrl}/confirmar/${idPrograma}/colAsignado/${idColAsignado}`)
  }

}
