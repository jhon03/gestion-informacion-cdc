import { ProgramaDto, InformacionDTO } from "../../infrastructure/dto/programa.dto";
import { Colaborador } from "../models/colaborador.models";
import { Programa } from "../models/programa.models";

export class ProgramaMapper {

    static programToProgramDto(programa: Programa, colaboradorCreador: Colaborador, ColaboradorResponsable: Colaborador):ProgramaDto{

         // Mapeo de la información dinámica
         const informacionDto: InformacionDTO[] = programa.informacion.map((info: any) => ({
            campo: info.campo,
            valor: info.valor
        }));
        
        return {
            id: programa.idPrograma,
            idColaborador: colaboradorCreador.idColaborador,
            colaborador: colaboradorCreador.nombreColaborador,
            estado: programa.estado,
            nombrePrograma: programa.nombrePrograma,
            fechaCreacion: programa.fechaCreacion,
            idColaboradorResponsable: ColaboradorResponsable.idColaborador,
            nombreColaboradorResponsable: ColaboradorResponsable.nombreColaborador,
            ColaboradorResponsable: ColaboradorResponsable.nombreColaborador,
            formato: programa.formato,
            informacion: informacionDto, // Asignar el array de información
            idPrograma: programa.idPrograma, // Asegúrate de que coincida
            colaboradorCreador: colaboradorCreador.nombreColaborador
      
        }
    };

    static programDtoToProgram(programDto: ProgramaDto): Programa {
        const informacion = programDto.informacion.map((infoDto: InformacionDTO) => ({
            campo: infoDto.campo,
            valor: infoDto.valor
        }));
        return {
            idPrograma: programDto.id,
            nombrePrograma: programDto.nombrePrograma,
            estado: programDto.estado,
            formato: programDto.formato,
            fechaCreacion: programDto.fechaCreacion,
            colaboradorCreador: programDto.idColaborador,
            ColaboradorResponsable: programDto.idColaboradorResponsable,
            informacion: informacion // Asignar el array de información
        }
    }

}