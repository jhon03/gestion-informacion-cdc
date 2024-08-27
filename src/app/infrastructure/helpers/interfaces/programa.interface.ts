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
    pagina?:string,
    msg: string,
    programas: ProgramaDto[],
    tokenAcessoRenovado?: string,
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto,
    tokenAcessoRenovado?: string,
}

