import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { necesidadRequest, responseNecesidad } from '../../helpers/interfaces/necesidad.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NecesidadService {

  private apiUrl = `${environment.apiUrl}/api/necesidades/registroNecesidad`;

  constructor(private http: HttpClient) { }
  crearRegistroNecesidad(data: necesidadRequest): Observable<responseNecesidad> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('tokenAcesso')}`,
    });
    return this.http.post<responseNecesidad>(this.apiUrl, data, { headers });
  }
  obtenerRegistrosNecesidad(): Observable<{ message: string, registros: responseNecesidad['registro'][] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('tokenAcesso')}`,
    });
    return this.http.get<{ message: string, registros: responseNecesidad['registro'][] }>(
      `${environment.apiUrl}/api/necesidades/obtenerNecesidades`,
      { headers }
    );
  }
  eliminarRegistro(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/necesidades/eliminarRegistro/${id}`);
  }
  actualizarRegistro(id: string, necesidades: necesidadRequest): Observable<responseNecesidad> {
    return this.http.put<responseNecesidad>(`${environment.apiUrl}/api/necesidades/actualizarRegistroNecesidad/${id}`, necesidades);
  }

}
