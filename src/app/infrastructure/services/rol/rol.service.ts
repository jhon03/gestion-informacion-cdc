import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rolesResponse, rolRequest, rolResponse } from '../../helpers/interfaces/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl: string = `${environments.baseUrl}/api/rol`

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<rolesResponse>{
    return this.http.get<rolesResponse>(`${this.baseUrl}/listRols`);
  }

  obtenerRolesSinPaginacion(): Observable<rolesResponse>{
    return this.http.get<rolesResponse>(`${this.baseUrl}/findRols`);
  }

  obtenerRoleById(id: string): Observable<rolResponse>{
    return this.http.get<rolResponse>(`${this.baseUrl}/findRolById/${id}`);
  }

  crearRol(datos: rolRequest): Observable<rolResponse>{
    return this.http.post<rolResponse>(`${this.baseUrl}/crear`, datos);
  }

}
