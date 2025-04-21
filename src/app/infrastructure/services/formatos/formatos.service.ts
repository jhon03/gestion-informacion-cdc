import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramaService } from '../programa/programa.service';
@Injectable({
  providedIn: 'root'
})
export class FormatosService {

private Url: string = `${environment.apiUrl}/api/onedrive`;
//private programasUrl: string = `${environment.apiUrl}/api/programa/obtenerProgramas`;
constructor(private http: HttpClient, private programasService: ProgramaService) { }

  //subir archivos a one drive
  subirArchivo(file: File, nombrePrograma: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('nombrePrograma', nombrePrograma); // Enviar el nombre del programa

    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No hay token disponible.'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.Url}/upload`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error al subir archivo:', error);
        return throwError(() => error);
  })
    );
  }
 // Ahora obtenemos los programas desde ProgramasService
 obtenerProgramas(page: number, limit: number = 10) {
  return this.programasService.obtenerProgramas(page, limit);
}
}
