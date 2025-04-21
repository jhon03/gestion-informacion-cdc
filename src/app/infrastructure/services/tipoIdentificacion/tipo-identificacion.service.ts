import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { tIdentificacionResponse, tIdentificacionesResponse } from '../../helpers/interfaces/tipoIdentificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private apiUrl: string = `${environment.apiUrl}/api/identificaciones`

  constructor(private http: HttpClient) { }

  obtenerIdentificaciones(): Observable<tIdentificacionesResponse>{
    console.log(`${this.apiUrl}/listaIdentificaciones`)
    return this.http.get<tIdentificacionesResponse>(`${this.apiUrl}/listaIdentificaciones?page=3`);
  }

  //no implementado en el backend
  obtenerIdentificacionById(id: string): Observable<tIdentificacionResponse>{
    return this.http.get<tIdentificacionResponse>(`${this.apiUrl}/`);
  }

  obtenerIdentificacionesSinPaginacion(): Observable<tIdentificacionesResponse>{
    return this.http.get<tIdentificacionesResponse>(`${this.apiUrl}/getIdentificaciones`);
  }
}
