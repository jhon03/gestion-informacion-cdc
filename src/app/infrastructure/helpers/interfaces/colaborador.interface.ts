import { ColaboradorDto } from "../../dto/colaborador.dto"
import { UserDto } from "../../dto/user.dto"


export interface colaboradorRequest {
    tipoIdentificacion: string,
    numeroIdentificacion: number| string,
    nombreColaborador: string,
    nombreUsuario: string,
    contrasena: string,
    rol: string
}



export interface colaboradoresResponse {
    pagina?: number,
    paginasDis?: number,
    msg: string,
    colaboradores: ColaboradorDto[],
    tokenAcessoRenovado?: string
}

export interface colaboradorResponse {
    msg: string,
    colaborador: ColaboradorDto
    usuario?: UserDto
    tokenAcessoRenovado?: string
}