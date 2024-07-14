import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Programa } from '../../../domain/models/programa.models';
import { ProgramaDto } from '../../dto/programa.dto'
import { ProgramaMapper } from '../../../domain/mappers/programa.mapper';
import { responseProgram, responsePrograms } from '../../helpers/interfaces/programa.interface';
import { programaRequest } from '../../helpers/interfaces/programa.interface';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private apiUrl: string = `${environment.apiUrl}/api/colaboradores`

  constructor(private http: HttpClient) { }

  obtenerProgramas(): Observable<responsePrograms>{
    return this.http.get<responsePrograms>(`${this.apiUrl}/obtenerProgramas`)
  }

  obtenerProgramaById(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.apiUrl}/${idPrograma}`)
  }
  obtenerProgramasEnEspera(): Observable<responsePrograms>{
    return this.http.get<responsePrograms>(`${this.apiUrl}/obtenerProgramasConfirmacion`);
  }

  activarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.apiUrl}/activar/${idPrograma}`);
  }

  actualizarPrograma(idPrograma: string, datos: programaRequest): Observable<responseProgram>{
    return this.http.put<responseProgram>(`${this.apiUrl}/actualizar/${idPrograma}`, datos)
  }

  crearPrograma(idColaborador: string, datos: programaRequest): Observable<responseProgram>{
    return this.http.post<responseProgram>(`${this.apiUrl}/${idColaborador}/crearPrograma`, datos);
  }

  desactivarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.apiUrl}/desactivar/${idPrograma}`);
  }

  confirmarPrograma(idPrograma: string, idColAsignado: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.apiUrl}/confirmar/${idPrograma}/colAsignado/${idColAsignado}`)
  }

}
