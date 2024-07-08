import { ProgramaDto } from "../../dto/programa.dto"

export interface programaRequest {
    nombrePrograma: string,
    formato: Record<string, any>
}


export interface responsePrograms {
    msg: string,
    programas: ProgramaDto[]
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto
}