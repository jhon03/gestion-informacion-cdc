import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import { formProgramaRequest, responseFormPrograma, DiligenciarFormularioRequest, ResponseDiligenciarFormulario} from '../../helpers/interfaces/formPrograma.interface';
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
  //Método para diligenciar un formulario

  diligenciarFormulario(colaboradorId: string, idFormulario: string, data: DiligenciarFormularioRequest):
  Observable<ResponseDiligenciarFormulario>{

    console.log(`Formulario ID: ${idFormulario}, Colaborador ID: ${colaboradorId}`);
  return this.http.post<ResponseDiligenciarFormulario>(`${this.Url}/formularios/${colaboradorId}/${idFormulario}/diligenciar`, data).pipe(
      catchError(error => {
        console.error('Error al diligenciar el formulario', error);
        return throwError(error);
      })
    )
  }
}
