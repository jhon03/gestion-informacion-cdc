import { ColaboradorDto } from "../../infrastructure/dto/colaborador.dto";
import { UserDto } from "../../infrastructure/dto/user.dto";
import { Colaborador } from "../models/colaborador.models";
import { Rol } from "../models/rol.models";
import { User } from "../models/user.models";

export class UserMapper {

    static userToUserDto(user: User, rol:Rol, colaborador: Colaborador): UserDto {
        return {
            idUsuario: user.idUsuario,
            colaborador: colaborador.nombreColaborador,
            nombreUsuario: user.nombreUsuario,
            contrasena: user.contrasena,
            rol: rol.nombreRol,
            estado: user.estado
        }
    }

    static userDtoToUser(userDto: UserDto, rol:Rol, colaborador: Colaborador) : User {
        return {
            idUsuario: userDto.idUsuario,
            colaborador: colaborador.idColaborador,
            nombreUsuario: userDto.nombreUsuario,
            contrasena: userDto.contrasena,
            rol: rol.idRol,
            estado: userDto.estado
        }
    }

}