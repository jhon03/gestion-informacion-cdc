import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Programa } from '../../../domain/models/programa.models';
import { ProgramaDto } from '../../dto/programa.dto'
import { ProgramaMapper } from '../../../domain/mappers/programa.mapper';
import { responseProgram } from '../../helpers/interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private apiUrl: string = 'http://localhost:8080/api/programa'
  //private readonly http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  obtenerProgramas(): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.apiUrl}/obtenerProgramas`)
  }

  obtenerProgramaById(idPrograma: string): Observable<ProgramaDto>{
    return this.http.get<ProgramaDto>(`${this.apiUrl}/${idPrograma}`)
  }

}
