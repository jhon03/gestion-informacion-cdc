import { Injectable } from "@angular/core";
import { ProgramaRepository } from "../../domain/repositories/programa.repository";
import { Observable } from "rxjs";
import { Programa } from "../../domain/entities/programa.model";
import { ProgramaService } from "../services/programa/programa.service";
import { ProgramaDto } from "../dto/programa.dto";
import { responseProgram } from "../helpers/interfaces/responses.interface";

@Injectable({
    providedIn: 'root'
})

export class programaRepositoryImpl implements ProgramaRepository {

    constructor(private programaService: ProgramaService){}

    getPrograms(): Observable<responseProgram> {
        return this.programaService.obtenerProgramas();
    }

    getProgramById(idPrograma: string): Observable<ProgramaDto> {
        return this.programaService.obtenerProgramaById(idPrograma);
    }

    
}