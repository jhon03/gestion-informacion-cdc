import { UserDto } from "../../dto/user.dto";




export interface userResponse {
    msg: string,
    usuario: UserDto;
}

export interface usersResponse {
    msg: string,
    usuarios: UserDto[];
}