import { Injectable } from "@angular/core";
import { ProgramaRepository } from "../../domain/repositories/programa.repository";
import { Observable } from "rxjs";
import { Programa } from "../../domain/models/programa.models";
import { ProgramaService } from "../services/programa/programa.service";
import { ProgramaDto } from "../dto/programa.dto";
import { programaRequest, responseProgram, responsePrograms } from "../helpers/interfaces/programa.interface";


@Injectable({
    providedIn: 'root'
})

export class programaRepositoryImpl implements ProgramaRepository {

    constructor(private programaService: ProgramaService){}

    getProgramsInConfirmation(): Observable<responsePrograms> {
        return this.programaService.obtenerProgramasEnEspera();
    }
    activateProgram(idPrograma: string): Observable<responseProgram> {
        return this.programaService.activarPrograma(idPrograma);
    }
    desactivateProgram(idPrograma: string): Observable<responseProgram> {
        return this.programaService.desactivarPrograma(idPrograma);
    }
    confirmarPrograma(idPrograma: string, idColaboradorAsignado: string): Observable<responseProgram> {
        return this.programaService.confirmarPrograma(idPrograma, idColaboradorAsignado);
    }
    crearProgram(idColaborador: string, datos: programaRequest): Observable<responseProgram> {
        return this.programaService.crearPrograma(idColaborador, datos);
    }
    updateProgram(idPrograma: string, datos: programaRequest): Observable<responseProgram> {
        return this.programaService.actualizarPrograma(idPrograma, datos);
    }

    getPrograms(): Observable<responsePrograms> {
        return this.programaService.obtenerProgramas();
    }

    getProgramById(idPrograma: string): Observable<responseProgram> {
        return this.programaService.obtenerProgramaById(idPrograma);
    }

    
}