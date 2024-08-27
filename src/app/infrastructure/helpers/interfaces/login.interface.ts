import { UserDto } from "../../dto/user.dto"


export interface loginRequest {

    nombreUsuario: string,
    contrasena: string
};

export interface loginResponse {

    msg: string,
    usuario: UserDto,
    tokenAcesso: string
}