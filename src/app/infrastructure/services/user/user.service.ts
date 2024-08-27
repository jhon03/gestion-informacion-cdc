import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userResponse, usersResponse } from '../../helpers/interfaces/user.interface';
import { UserDto } from '../../dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private apiUrl: string = `${environment.apiUrl}/api/user`

  constructor(private http: HttpClient) { }

  buscarUsers():Observable<usersResponse>{
    return this.http.get<usersResponse>(`${this.apiUrl}/listUsers?page=3`);
  }

  buscarUserById(idUser: string):Observable<userResponse>{
    return this.http.get<userResponse>(`${this.apiUrl}/findById/${idUser}`);
  }

  activarUser(idUser: string): Observable<userResponse>{
    return this.http.get<userResponse>(`${this.apiUrl}/activar/${idUser}`);
  }

  desactivarUser(idUser: string): Observable<userResponse>{
    return this.http.delete<userResponse>(`${this.apiUrl}/desactivar/${idUser}`);
  }

  actualizarUser(idUser: string, datos: UserDto): Observable<userResponse>{
    return this.http.put<userResponse>(`${this.apiUrl}/actualizar/${idUser}`, datos);
  }

  obtenerUsuarioActual(): Observable<userResponse>{
    return this.http.get<userResponse>(`${this.apiUrl}/getCurrentUser`);
  }

}