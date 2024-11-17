import { ColaboradorDto } from "../../dto/colaborador.dto"
import { UserDto } from "../../dto/user.dto"

export interface colaboradorRequest {
    tipoIdentificacion: string,
    numeroIdentificacion: number| string,
    nombreColaborador: string,
    nombreUsuario: string,
    contrasena: string,
    rol: string;

}


export interface colaboradoresResponse {
    pagina?: number,
    paginasDis?: number,
    msg: string,
    colaboradores: ColaboradorDto[],
    tokenAcessoRenovado?: string

}

//implementado para obtener los colaboradores desde el el servicio con paginación implementada
export interface colaboradoresPageResponse {
    total: number;
    totalPaginas: number;
    colaboradores:  Colaborador[];
}

//utilizado para obtener los colaboradores con el rol, desde el servicio
export interface colaboradorResponse {
    msg: string,
    colaborador: ColaboradorDto
    usuario?: UserDto
    tokenAcessoRenovado?: string

    nombreColaborador: string;
    id: string;
    tipoIdentificacion: string;
    numeroDocumento: string;
    nombre: string;
    idColaborador: string;
    nombreUsuario: string;
    rol: string;
    estado: string;
    fechaCreacion:string;
    fechaModificacion: string;


}
//INTERFACE UTILIZADA PARA OBTENER COLABORADORES POR ROL
export interface Colaborador {
    idColaborador: string;
    nombreColaborador: string;
    nombreUsuario: string;
    rol: string;
    estado: string;
    fechaCreacion: string;
    fechaModificacion: string;
  }

