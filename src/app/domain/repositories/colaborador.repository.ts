import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { colaboradorRequest, colaboradorResponse, colaboradoresResponse } from "../../infrastructure/helpers/interfaces/colaborador.interface";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export abstract class ColaboradorRepository {

  
    abstract getColaboradorById(idColaborador: string): Observable<HttpResponse<colaboradorResponse>>;
    abstract createColaborador(datos: colaboradorRequest): Observable<colaboradorResponse>;
    abstract updateColaborador(idColaborador: string, datos: colaboradorResponse): Observable<colaboradorResponse>;
    abstract desactivateColaborador(idColaborador: string): Observable<colaboradorResponse>;
    abstract activateColaborador(idColaborador: string): Observable<colaboradorResponse>;

    //abstract actualizarColaborador(idColaborador: string, nombreColaborador: string, nombreUsuario: string): Observable<colaboradorResponse>;
}