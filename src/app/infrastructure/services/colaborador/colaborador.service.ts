import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../../../domain/models/colaborador.models';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apiUrl = environment.apiUrl;
  
  private endpoint = `${this.apiUrl}/api/colaborador`;

  constructor(private httpClient: HttpClient) { }

  crearColaborador(colaborador: Colaborador): Observable<Colaborador>{
    return this.httpClient.post<Colaborador>(this.endpoint, colaborador)
  }


  }



