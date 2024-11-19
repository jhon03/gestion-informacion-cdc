
export interface ColaboradorDto {

    id: string,
    tipoIdentificacion: string,
    numeroDocumento: number,
    nombre: string,
    fechaCreacion: string,
    fechaModificacion: string,
    estado: string
    rol: string;
    email: string;

    users: {
        idUsuario: string;
        nombreUsuario: string;
        rol: string;
        estado: string;
        colaborador: string;
        contrasena: string;
    }

}