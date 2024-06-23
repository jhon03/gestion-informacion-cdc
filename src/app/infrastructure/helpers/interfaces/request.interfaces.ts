
export interface programaRequest {
    nombrePrograma: string,
    formato: Record<string, any>
}

export interface colaboradorRequest {
    tipoIdentificacion: string,
    numeroIdentificacion: number,
    nombreColaborador: string,
    nombreUsuario: string,
    contrasena: string
}