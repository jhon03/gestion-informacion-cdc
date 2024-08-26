import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tIdentificacionResponse, tIdentificacionesResponse } from "../../infrastructure/helpers/interfaces/tipoIdentificacion.interface";


@Injectable({
    providedIn: 'root'
 })

 export abstract class TipoIdentificacionRepository {

    abstract getTipoIdentificacionById(): Observable<tIdentificacionResponse>;
    abstract getTipoIdentificaciones():Observable<tIdentificacionesResponse>;
    abstract getIdentificacionsWithOutPagination(): Observable<tIdentificacionesResponse>
 }