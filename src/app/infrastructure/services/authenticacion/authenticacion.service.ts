import { Injectable } from '@angular/core';

import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticacionService {


  private apiUrl: string = `${environment.apiUrl}/api/auth`;

  
  constructor( private http: HttpClient) { }

   login(username: string, password: string):
   Observable<any>{

    return this.http.post(`${this.apiUrl}/login`, {nombreUsuario: username, contrasena: password});
   }
 

}
