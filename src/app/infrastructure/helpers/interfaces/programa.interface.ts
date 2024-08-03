import { ProgramaDto } from "../../dto/programa.dto"

export enum tipoDato {
    string='string',
    number='number',
}

export interface programaRequest {
    nombrePrograma: string,
    formato: Record<string, tipoDato>
}


export interface responsePrograms {
    msg: string,
    programas: ProgramaDto[]
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto
}

