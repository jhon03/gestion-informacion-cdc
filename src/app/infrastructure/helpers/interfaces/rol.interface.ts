import { RolDto } from "../../dto/rol.dto"

export interface rolRequest {
    nombreRol: string,
    descripcion: string
}

export interface rolesResponse {
    pagina?: string
    msg: string,
    roles: RolDto[],
    tokenAcessoRenovado?: string,
}

export interface rolResponse {
    msg: string,
    rol: RolDto
}