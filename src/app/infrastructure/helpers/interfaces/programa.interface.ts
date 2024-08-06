import { ProgramaDto } from "../../dto/programa.dto"

export enum tipoDato {
    string='string',
    number='number',
}

export interface programaRequest {
    nombrePrograma: string,
    informacion: Record<string, string|number>
}


export interface responsePrograms {
    msg: string,
    programas: ProgramaDto[]
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto
}

