import { Observable } from "rxjs";
import { colaboradorResponse, colaboradoresResponse } from "../../infrastructure/helpers/interfaces/responses.interface";
import { colaboradorRequest } from "../../infrastructure/helpers/interfaces/request.interfaces";
import { Injectable } from "@angular/core";

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