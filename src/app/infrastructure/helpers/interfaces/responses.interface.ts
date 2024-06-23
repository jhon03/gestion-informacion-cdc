import { ColaboradorDto } from "../../dto/colaborador.dto";
import { ProgramaDto } from "../../dto/programa.dto";
import { UserDto } from "../../dto/user.dto";

export interface responsePrograms {
    msg: string,
    programas: ProgramaDto[]
}

export interface responseProgram {
    msg: string,
    programa: ProgramaDto
}

export interface colaboradoresResponse {
    msg: string,
    colaboradores: ColaboradorDto[]
}

export interface colaboradorResponse {
    msg: string,
    colaborador: ColaboradorDto
    usuario?: UserDto
}