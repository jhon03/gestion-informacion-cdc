import { Observable } from "rxjs";
import { ColaboradorRepository } from "../../domain/repositories/colaborador.repository";
import { ColaboradorService } from "../services/colaborador/colaborador.service";
import { Injectable } from "@angular/core";
import { colaboradorRequest, colaboradorResponse, colaboradoresResponse } from "../helpers/interfaces/colaborador.interface";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ColaboradorRepositoryImpl implements ColaboradorRepository {

    constructor(private colaboradorService: ColaboradorService){}

    updateColaborador(idColaborador: string, datos: colaboradorResponse): Observable<colaboradorResponse> {
        return this.colaboradorService.actualizarColaborador(idColaborador, datos);
    }

    
    getColaboradorById(idColaborador: string): Observable<HttpResponse<colaboradorResponse>> {
        return this.colaboradorService.obtenerColaboradorById(idColaborador);
    }
    createColaborador(datos: colaboradorRequest): Observable<colaboradorResponse> {
        return this.colaboradorService.crearColaborador(datos);
    }

    desactivateColaborador(idColaborador: string): Observable<colaboradorResponse> {
        return this.colaboradorService.desactivarColaborador(idColaborador);
    }
    activateColaborador(idColaborador: string): Observable<colaboradorResponse> {
        return this.colaboradorService.activarColaborador(idColaborador);
    }



}