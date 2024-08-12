import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rolesResponse, rolRequest, rolResponse } from '../../helpers/rol.interface';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl: string = `${environment.apiUrl}/api/rol`

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<rolesResponse>{
    return this.http.get<rolesResponse>(`${this.apiUrl}/listRols`);
  }
  obtenerRoleById(id: string): Observable<rolResponse> {
  return this.http.get<rolResponse>(`${this.apiUrl}/findRolById/${id}`);
  }
  crearRol(datos: rolRequest): Observable<rolResponse>{
    return this.http.post<rolResponse>(`${this.apiUrl}/crear`, datos);
  }
}
