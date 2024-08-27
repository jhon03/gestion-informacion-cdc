import { Injectable } from "@angular/core";
import { TipoIdentificacionRepository } from "../../domain/repositories/tipoIdentificacion.repositories";
import { TipoIdentificacionService } from "../services/tipoIdentificacion/tipo-identificacion.service";
import { Observable } from "rxjs";
import { tIdentificacionResponse, tIdentificacionesResponse } from "../helpers/interfaces/tipoIdentificacion.interface";


@Injectable({
    providedIn: 'root'
})

export class TidentificacionRepositoryImp implements TipoIdentificacionRepository {

    constructor(private tipoIdentificacionService: TipoIdentificacionService) { }


    getIdentificacionsWithOutPagination(): Observable<tIdentificacionesResponse> { 
        return this.tipoIdentificacionService.obtenerIdentificacionesSinPaginacion();
    }

    getTipoIdentificaciones(): Observable<tIdentificacionesResponse> {
        return this.tipoIdentificacionService.obtenerIdentificaciones();
    }

    getTipoIdentificacionById(): Observable<tIdentificacionResponse> {
        return this.tipoIdentificacionService.obtenerIdentificacionById("");
    }
}