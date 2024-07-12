import { ColaboradorDto } from "../../dto/colaborador.dto"
import { UserDto } from "../../dto/user.dto"


export interface colaboradorRequest {
    tipoIdentificacion: string,
    numeroIdentificacion: number| string,
    nombreColaborador: string,
    nombreUsuario: string,
    contrasena: string
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