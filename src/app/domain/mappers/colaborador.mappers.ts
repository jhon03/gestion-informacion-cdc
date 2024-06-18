import { ColaboradorDto } from "../../infrastructure/dto/colaborador.dto";
import { Colaborador } from "../models/colaborador.models";
import { TipoIdentificacion } from "../models/tipoIdentificacion.models";

export class ColaboradorMapper {

    static colaboradorToColaboradorDto(colaborador: Colaborador, tipoIdentificacion: TipoIdentificacion): ColaboradorDto {
        return {
            id: colaborador.idColaborador,
            tipoIdentificacion: tipoIdentificacion.nombreIdentificacion,
            numeroDocumento: colaborador.numeroIdentificacion,
            nombre: colaborador.nombreColaborador,
            fechaCreacion: colaborador.fechaCreacion,
            fechaModificacion: colaborador.fechaModificacion,
            estado: colaborador.estado,
        }
    };

    static ColaboradorDtoToColaborador(colaboradorDto: ColaboradorDto, tipoIdentificacion: TipoIdentificacion): Colaborador {
        return {
            idColaborador: colaboradorDto.id,
            tipoIdentificacion: tipoIdentificacion.idIdentificacion,
            numeroIdentificacion: colaboradorDto.numeroDocumento,
            nombreColaborador: colaboradorDto.nombre,
            fechaCreacion: colaboradorDto.fechaCreacion,
            fechaModificacion: colaboradorDto.fechaModificacion,
            estado: colaboradorDto.estado,
        }
    }

}