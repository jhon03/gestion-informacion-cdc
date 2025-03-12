import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import { formProgramaRequest, ResponseFormPrograma, DiligenciarFormularioRequest, responseFormPrograma} from '../../helpers/interfaces/formPrograma.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormularioProgramaService {



  private Url: string = `${environment.apiUrl}/api/formPrograma`;

  constructor(
  private http: HttpClient) {}

  crearFormularioPrograma(colaboradorId: string, datos: formProgramaRequest): Observable<responseFormPrograma> {
    return this.http.post<responseFormPrograma>(`${this.Url}/${colaboradorId}/formularios/crear/`, datos).pipe(
      catchError(this.handleError)
    )

  }
  private handleError(error: HttpErrorResponse){
    if (error.status === 400) {
      return throwError(() => new Error('Este programa ya tiene un formulario asociado.'));
    } else {
      return throwError(() => new Error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.'));
    }

   //Método para obtener el formulario por ID


   }
   obtenerFormulario(idPrograma: string, idFormulario: string): Observable<responseFormPrograma> {
    return this.http.get<responseFormPrograma>(`${this.Url}/${idPrograma}/formularios/${idFormulario}`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener el formulario:', error);
        return throwError(error);
      })
    );
  }

  //método para obtener el formulario or ID y poder diligenciar
obtenerFormularioPorId(idFormulario: string): Observable<any> {
  return this.http.get<any>(`${this.Url}/formularios/${idFormulario}`).pipe(
    catchError(error => {
      console.log('Error al obtener el formulario', error);
      return throwError(error);
    })
  )
}



    //Servicio para buscar un formulario por nombre del programa
    obtenerFormPrograma(nombrePrograma: string): Observable<ResponseFormPrograma> {
      const params = new HttpParams().set('nombrePrograma', nombrePrograma);
      return this.http.get<ResponseFormPrograma>(`${this.Url}/buscar`, { params }).
      pipe(
        catchError(error => {
          console.error('Error al obtener el formulario:', error);
          return throwError(error);
        })
      );
    }

    diligenciarFormulario(request: DiligenciarFormularioRequest): Observable<any>{
  return this.http.post(`${this.Url}/diligenciar`, request).pipe(
    catchError(error => {
      console.error('Error inesperado:', error);
      return throwError(error);
    })
  );
    }

  }

