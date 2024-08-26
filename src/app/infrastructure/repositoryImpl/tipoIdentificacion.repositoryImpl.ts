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

    getTipoIdentificaciones(): Observable<tIdentificacionesResponse> {
        return this.tipoIdentificacionService.obtenerIdentificaciones();
    }

    getIdentificacionsWithOutPagination(): Observable<tIdentificacionesResponse> {
        return this.tipoIdentificacionService.obtenerIdentificacionesSinPaginacion();
    }

    getTipoIdentificacionById(): Observable<tIdentificacionResponse> {
        return this.tipoIdentificacionService.obtenerIdentificacionById("");
    }
}