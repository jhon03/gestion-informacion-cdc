import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { tIdentificacionResponse, tIdentificacionesResponse } from '../../helpers/interfaces/tipoIdentificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private baseUrl: string = `${environments.baseUrl}/api/identificaciones`

  constructor(private http: HttpClient) { }

  obtenerIdentificaciones(): Observable<tIdentificacionesResponse>{
    return this.http.get<tIdentificacionesResponse>(`${this.baseUrl}/listaIdentificaciones`);
  }

  obtenerIdentificacionesSinPaginacion(): Observable<tIdentificacionesResponse>{
    return this.http.get<tIdentificacionesResponse>(`${this.baseUrl}/getIdentificaciones`);
  }

  //no implementado en el backend
  obtenerIdentificacionById(id: string): Observable<tIdentificacionResponse>{
    return this.http.get<tIdentificacionResponse>(`${this.baseUrl}/`);
  }
}
