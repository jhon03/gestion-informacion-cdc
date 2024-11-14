import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Colaborador } from '../../../domain/models/colaborador.models';
import { environment } from '../../../../enviroments/enviroment';
import { colaboradorResponse, colaboradoresPageResponse, colaboradoresResponse} from '../../helpers/interfaces/colaborador.interface';
import { colaboradorRequest } from '../../helpers/interfaces/colaborador.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { TokenRepository } from '../../../domain/repositories/tokenRepository';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  //rivate apiUrl = environment.apiUrl;

  private apiUrl: string = `${environment.apiUrl}/api/colaboradores`

  constructor(
    private tokenRepository: TokenRepository,
    private http: HttpClient) { }

//método que se esta utilizando para visualizar los programas activos/en espera de confirmación
    obtenerColaboradores(page: number, pageSize: number): Observable<HttpResponse<colaboradoresResponse>> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());

      return this.http.get<colaboradoresResponse>(`${this.apiUrl}/listColaboradores`, { params, observe: 'response' }).pipe(
        tap(({ body }: HttpResponse<colaboradoresResponse>) => {
          if (body?.tokenAcessoRenovado) {
            // Manejo del token si es necesario
          }
        })
      );
    }
//obtener colaboradores con rol
obtenerColaboradoresConRol(page: number, pageSize: number): Observable<colaboradoresPageResponse>{
  const params = new HttpParams()
  .set('page', page.toString())
  .set('pageSize', pageSize.toString());
return this.http.get<colaboradoresPageResponse>(`${this.apiUrl}/listcolaboradoresconroles`, {params}).pipe(
  tap(response => {
    console.log('Respuesta del servidor:', response); // Para ver qué llega
    if(!response || response.colaboradores.length === 0){
      console.log('no se encontraron colaboradores con roles')
    }
  }),
  catchError((error: HttpErrorResponse) => {
    console.log('error en la obtención de colaboradores', error);
    return throwError(() => new Error('Error al obtener colaboradores con roles'));
  })
);
}

  obtenerColaboradorById(idColaborador: string): Observable <HttpResponse<colaboradorResponse>>{
    return this.http.get<colaboradorResponse>(`${this.apiUrl}/findById/${idColaborador}`,{
      observe: 'response'
    }).pipe( tap(({body}: HttpResponse<colaboradorResponse>)  => {
      if(body?.tokenAcessoRenovado){
        this.tokenRepository.PutTokenInBrowser(body.tokenAcessoRenovado);
      }
    }));
  }

  //recomendación implementar en cada metodo de los servicios el async antes del nombre del metodo y el await despues del return. => optimización de memoria verificar que termine de hacero traer toda la información para seguir con la ejecución del código.
 crearColaborador(datos: colaboradorRequest): Observable<colaboradorResponse>{
    return this.http.post<colaboradorResponse>(`${this.apiUrl}/crear`, datos);
  }
  desactivarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.delete<colaboradorResponse>(`${this.apiUrl}/desactivar/${idColaborador}`);
  }

  activarColaborador(idColaborador: string): Observable<colaboradorResponse>{
    return this.http.get<colaboradorResponse>(`${this.apiUrl}/activar/${idColaborador}`);
  }
 //implementación del servicio para crear el colaborador
  actualizarColaborador(idColaborador: string, datos: colaboradorResponse): Observable<colaboradorResponse>{
    return this.http.put<colaboradorResponse>(`${this.apiUrl}/actualizar/${idColaborador}`, datos);
  }

  }



