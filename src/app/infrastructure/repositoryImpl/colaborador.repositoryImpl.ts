import { Observable } from "rxjs";
import { ColaboradorRepository } from "../../domain/repositories/colaborador.repository";
import { ColaboradorService } from "../services/colaborador/colaborador.service";
import { Injectable } from "@angular/core";
import { colaboradorRequest, colaboradorResponse, colaboradoresResponse } from "../helpers/interfaces/colaborador.interface";

@Injectable({
    providedIn: 'root'
}) 

export class ColaboradorRepositoryImpl implements ColaboradorRepository {
 
    constructor(private colaboradorService: ColaboradorService){}

    getColaboradors(): Observable<colaboradoresResponse> {
        return this.colaboradorService.obtenerColaboradores();
    }
    getColaboradorById(idColaborador: string): Observable<colaboradorResponse> {
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