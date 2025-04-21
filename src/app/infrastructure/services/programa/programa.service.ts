import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { responseProgram, responsePrograms } from '../../helpers/interfaces/programa.interface';
import { programaRequest } from '../../helpers/interfaces/programa.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

 // private apiUrl: string = `${environment.apiUrl}/api/colaboradores`;
  private Url: string = `${environment.apiUrl}/api/programa`;

  constructor(private http: HttpClient) { }

  obtenerProgramas(page: number, limit: number = 10): Observable<responsePrograms>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('tokenAcesso')}`, // Enviar el token almacenado
    });


    return this.http.get<responsePrograms>(`${this.Url}/obtenerProgramas?page=${page}&limit=${limit}`, {headers});
  }

  obtenerProgramaById(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.Url}/${idPrograma}`)
  }
  obtenerProgramasEnEspera(): Observable<responsePrograms>{
    return this.http.get<responsePrograms>(`${this.Url}/obtenerProgramasConfirmacion`);
  }

  activarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.Url}/activar/${idPrograma}`);
  }

  actualizarPrograma(idPrograma: string, datos: programaRequest): Observable<responseProgram>{
    return this.http.put<responseProgram>(`${this.Url}/actualizar/${idPrograma}`, datos)
  }

  crearPrograma(idColaborador: string, datos: programaRequest): Observable<responseProgram>{
    console.log('Llamando al servicio para crear programa con datos:', datos);
    return this.http.post<responseProgram>(`${this.Url}/${idColaborador}/crearPrograma`, datos);
  }

  desactivarPrograma(idPrograma: string): Observable<responseProgram>{
    return this.http.get<responseProgram>(`${this.Url}/desactivar/${idPrograma}`);
  }

  confirmarPrograma(idPrograma: string, idColAsignado: string, formato: any): Observable<programaRequest>{
    return this.http.post<programaRequest>(`${this.Url}/confirmar/${idPrograma}/colAsignado/${idColAsignado}`, formato)
  }
  obtenerFormatoPrograma(idPrograma: string){
    return this.http.get<{ formato: any}>(`/api/programas/${idPrograma}/formato`);
}

//subir archivos a one drive
subirArchivo(archivo: File): Observable<any> {
  const formData = new FormData();
  formData.append('archivo', archivo);
  return this.http.post<any>(`${this.Url}/api/onedrive/upload`, formData);
}
}