import { ProgramaDto } from "../../dto/programa.dto";

export interface responseProgram {
    msg: string,
    programas: ProgramaDto[]
}