import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {

private Url: string = `${environment.apiUrl}/api/onedrive`;

constructor(private http: HttpClient) { }

  //subir archivos a one drive
  subirArchivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.Url}/upload`, formData, { headers });
  }


}
