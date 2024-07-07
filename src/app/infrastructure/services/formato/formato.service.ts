import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formato } from '../../../domain/models/formato.models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  private apiUrl = 'http://url del api';
  constructor(private htttp: HttpClient) { }

  guardarFormato(nombre: string): Observable<any>{

    const payload = {nombre};
    return this.htttp.post(this.apiUrl, payload);
  }
}
