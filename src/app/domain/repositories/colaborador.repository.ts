import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { colaboradorRequest, colaboradorResponse, colaboradoresResponse } from "../../infrastructure/helpers/interfaces/colaborador.interface";

@Injectable({
    providedIn: "root"
})

export abstract class ColaboradorRepository {

    abstract getColaboradors():Observable<colaboradoresResponse>;
    abstract getColaboradorById(idColaborador: string): Observable<colaboradorResponse>
    abstract createColaborador(datos: colaboradorRequest): Observable<colaboradorResponse>;
    abstract updateColaborador(idColaborador: string, nombreColaborador: string): Observable<colaboradorResponse>;
    abstract desactivateColaborador(idColaborador: string): Observable<colaboradorResponse>;
    abstract activateColaborador(idColaborador: string): Observable<colaboradorResponse>;

}