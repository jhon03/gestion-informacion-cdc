import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rolesResponse, rolRequest, rolResponse } from '../../helpers/interfaces/rol.interface';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl: string = `${environment.apiUrl}/api/rol`

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<rolesResponse>{
    return this.http.get<rolesResponse>(`${this.apiUrl}/listRols?page=3`);
  }

  obtenerRolesSinPaginacion(): Observable<rolesResponse>{
    return this.http.get<rolesResponse>(`${this.apiUrl}/findRols`);
  }
  obtenerRoleById(id: string): Observable<rolResponse> {
  return this.http.get<rolResponse>(`${this.apiUrl}/findRolById/${id}`);
  }
  crearRol(datos: rolRequest): Observable<rolResponse>{
    return this.http.post<rolResponse>(`${this.apiUrl}/crear`, datos);
  }
}
