import { TipoIdentificacionDto } from "../../dto/tipoIdentificacion.dto";


export interface tIdentificacionResponse {
    msg: string,
    tipoIdentificacion: TipoIdentificacionDto
}

export interface tIdentificacionesResponse {
    pagina?:string,
    msg: string,
    Identificaciones: TipoIdentificacionDto[],
    tokenAcessoRenovado?: string,
}

export interface tIdentificacionRequest {
    nombreIdentificacion: string
}