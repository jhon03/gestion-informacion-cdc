import { ProgramaDto } from "../../dto/programa.dto"

export interface programaRequest {
    nombrePrograma: string,
    formato: Record<string, any>
}


export interface responsePrograms {
    msg: string,
    programas: ProgramaDto[]
    pagina: string;
    tokenAccessRenovado: string;
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto
}