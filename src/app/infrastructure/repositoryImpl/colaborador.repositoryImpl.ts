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

    getColaboradors(page: number, pageSize: number): Observable<HttpResponse<colaboradoresResponse>> {
        return this.colaboradorService.obtenerColaboradores(page, pageSize);
    }
    getColaboradorById(idColaborador: string): Observable<HttpResponse<colaboradorResponse>> {
        return this.colaboradorService.obtenerColaboradorById(idColaborador);
    }
    createColaborador(datos: colaboradorRequest): Observable<colaboradorResponse> {
        return this.colaboradorService.crearColaborador(datos);
    }
    updateColaborador(idColaborador: string, nombreColaborador: string): Observable<colaboradorResponse> {
        return this.colaboradorService.actualizarColaborador(idColaborador, nombreColaborador);
    }
    desactivateColaborador(idColaborador: string): Observable<colaboradorResponse> {
        return this.colaboradorService.desactivarColaborador(idColaborador);
    }
    activateColaborador(idColaborador: string): Observable<colaboradorResponse> {
        return this.colaboradorService.activarColaborador(idColaborador);
    }
    
}