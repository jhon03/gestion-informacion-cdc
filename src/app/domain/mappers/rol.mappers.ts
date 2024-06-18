import { RolDto } from "../../infrastructure/dto/rol.dto";
import { Rol } from "../models/rol.models";

export class RolMapper {

    static rolToRolDto(rol: Rol): RolDto {
        return {
            idRol: rol.idRol,
            nombreRol: rol.nombreRol,
            descripcion: rol.descripcion,
            estado: rol.estado
        }
    }

    static rolDtoToRol(rolDto: Rol): RolDto {
        return {
            idRol: rolDto.idRol,
            nombreRol: rolDto.nombreRol,
            descripcion: rolDto.descripcion,
            estado: rolDto.estado
        }
    }

}