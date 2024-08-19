import { Injectable } from '@angular/core';
import { loginResponse } from '../../helpers/interfaces/login.interface';
import { tokenDecoded } from '../../plugins/jwt/jwt-decode.plugin';
import { TokenDecoded } from '../../helpers/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  public obtenerToken(): String | null{
    return localStorage.getItem('token');
  };

  public eliminarTokenLs(): void {
    localStorage.removeItem('token');
  }

  public ponerTokenEnLS(token: string){
    if(token){
      localStorage.setItem('token', token);
    }
  }

  public renovarTokenLS(tokenRenovado: string){
    if(tokenRenovado){
      localStorage.setItem('token', tokenRenovado);
    }
  }

  public estaExpiradoElToken(token: string): boolean{
    try {
      const decodeToken = tokenDecoded(token);
      const expirationDate = decodeToken.exp ?? 0;
      const currentTime = Date.now() / 1000;    // Obtener la hora actual en milisegundos
      //console.log(`hora actual: ${currentTime}\ntoken invalido: ${currentTime > expirationDate}`);      
      return currentTime > expirationDate;
    } catch (error) {
      console.log('token inavalido: ' + error);
      return true;
    }
  }

  public obtenerRolUsuario(token: string ) : string {
    const rol: TokenDecoded = this.decodificarToken(token);
    return rol.rol;
  }

  private decodificarToken(token: string): TokenDecoded {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  
}
