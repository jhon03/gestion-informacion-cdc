import { Observable } from 'rxjs';
import { Programa } from '../models/programa.models';
import { ProgramaDto } from '../../infrastructure/dto/programa.dto';
import { Injectable, inject } from '@angular/core';
import { programaRequest, responseProgram, responsePrograms } from '../../infrastructure/helpers/interfaces/programa.interface';


@Injectable({
   providedIn: 'root'
})

export abstract class ProgramaRepository {
   
   abstract getPrograms(): Observable<responsePrograms>;
   abstract getProgramsInConfirmation(): Observable<responsePrograms>
   abstract getProgramById(idPrograma: string):Observable<responseProgram>;
   abstract activateProgram(idPrograma: string): Observable<responseProgram>;
   abstract desactivateProgram(idPrograma: string): Observable<responseProgram>;
   abstract confirmarPrograma(idPrograma: string, idColaboradorAsignado: string): Observable<responseProgram>;
   abstract crearProgram(idColaborador: string, datos: programaRequest): Observable<responseProgram>;
   abstract updateProgram(idPrograma: string, datos: programaRequest): Observable<responseProgram>;
}
