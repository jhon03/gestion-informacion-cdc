import { UserDto } from "../../dto/user.dto";


export interface userResponse {
    msg: string,
    usuario: UserDto;
}

export interface usersResponse {
    pagina?:string,
    msg: string,
    usuarios: UserDto[];
    tokenAcessoRenovado?: string,
}