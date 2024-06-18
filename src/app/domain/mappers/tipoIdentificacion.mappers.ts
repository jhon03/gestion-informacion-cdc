import { TipoIdentificacionDto } from "../../infrastructure/dto/tipoIdentificacion.dto";
import { TipoIdentificacion } from "../models/tipoIdentificacion.models";

export class TipoIdentificacionMapper{

    static tIdentificacionToTIdentificacionDto(tipoIdentificacion: TipoIdentificacion): TipoIdentificacionDto{

        return {
            idIdentificacion: tipoIdentificacion.idIdentificacion,
            nombreIdentificacion: tipoIdentificacion.nombreIdentificacion,
            fechaCreacion: tipoIdentificacion.fechaCreacion,
            estado: tipoIdentificacion.estado,
        }

    }

}