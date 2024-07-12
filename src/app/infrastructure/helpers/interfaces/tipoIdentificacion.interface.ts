import { TipoIdentificacionDto } from "../../dto/tipoIdentificacion.dto";


export interface tIdentificacionResponse {
    msg: string,
    tipoIdentificacion: TipoIdentificacionDto
}

export interface tIdentificacionesResponse {
    msg: string,
    Identificaciones: TipoIdentificacionDto[]
}

export interface tIdentificacionRequest {
    nombreIdentificacion: string
}