import { Observable } from 'rxjs';
import { Programa } from '../entities/programa.model';
import { ProgramaDto } from '../../infrastructure/dto/programa.dto';
import { Injectable, inject } from '@angular/core';
import { responseProgram } from '../../infrastructure/helpers/interfaces/responses.interface';

@Injectable({
   providedIn: 'root'
})

export abstract class ProgramaRepository {
   abstract getPrograms(): Observable<responseProgram>;
   abstract getProgramById(idPrograma: string):Observable<ProgramaDto>;
}
