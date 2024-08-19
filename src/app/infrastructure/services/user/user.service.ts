import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userResponse, usersResponse } from '../../helpers/interfaces/user.interface';
import { environments } from '../../../../environments/environments';
import { UserDto } from '../../dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = `${environments.baseUrl}/api/user`

  constructor(private http: HttpClient) { }

  buscarUsers():Observable<usersResponse>{
    return this.http.get<usersResponse>(`${this.url}/listUsers?page=3`);
  }

  buscarUserById(idUser: string):Observable<userResponse>{
    return this.http.get<userResponse>(`${this.url}/findById/${idUser}`);
  }

  activarUser(idUser: string): Observable<userResponse>{
    return this.http.get<userResponse>(`${this.url}/activar/${idUser}`);
  }

  desactivarUser(idUser: string): Observable<userResponse>{
    return this.http.delete<userResponse>(`${this.url}/desactivar/${idUser}`);
  }

  actualizarUser(idUser: string, datos: UserDto): Observable<userResponse>{
    return this.http.put<userResponse>(`${this.url}/actualizar/${idUser}`, datos);
  }

  obtenerUsuarioActual(): Observable<userResponse>{
    return this.http.get<userResponse>(`${this.url}/getCurrentUser`);
  }

}
