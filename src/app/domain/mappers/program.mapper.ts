import { ProgramaDto } from "../../infrastructure/dto/programa.dto";
import { Colaborador } from "../entities/colaborador.model";
import { Programa } from "../entities/programa.model";

export class programMapper {

    static programToProgramDto(programa: Programa, colaboradorCreador: Colaborador, ColaboradorResponsable: Colaborador):ProgramaDto{
        
        return {
            id: programa.idPrograma,
            idColaborador: colaboradorCreador.idColaborador,
            colaborador: colaboradorCreador.nombreColaborador,
            estado: programa.estado,
            nombrePrograma: programa.nombrePrograma,
            fechaCreacion: programa.fechaCreacion,
            idColaboradorResponsable: ColaboradorResponsable.idColaborador,
            nombreColaboradorResponsable: ColaboradorResponsable.nombreColaborador,
            formato: programa.formato,
        }
    };

    static programDtoToProgram(programDto: ProgramaDto): Programa {

        return {
            idPrograma: programDto.id,
            nombrePrograma: programDto.nombrePrograma,
            estado: programDto.estado,
            formato: programDto.formato,
            fechaCreacion: programDto.fechaCreacion,
            colaboradorCreador: programDto.idColaborador,
            ColaboradorResponsable: programDto.idColaboradorResponsable,

        }
    }

}