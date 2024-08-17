import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(){
    return localStorage.getItem('token');
  };

  


}
