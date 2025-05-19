import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaRequest, AsistenciaResponse } from '../helpers/interfaces/asistencia.interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
private Url: string = `${environment.apiUrl}/api/asistencias`;


  constructor(private http: HttpClient) { }
registrarAsistencia(data: AsistenciaRequest, token: string): Observable<AsistenciaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token
    });
        return this.http.post<AsistenciaResponse>(`${this.Url}/registrarasistencias`, data, { headers });

}
}
