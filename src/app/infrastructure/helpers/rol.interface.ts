import { RolDto } from "../dto/rol.dto";

export interface rolRequest {

    nombreRol: string;
    descripcion: string;
}

export interface rolesResponse {
    msg: string;
    roles: RolDto[];

}

export interface rolResponse {
    msg: string;
    rol: RolDto; 
}