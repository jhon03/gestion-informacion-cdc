
export interface InformacionDTO{
    campo: string;
    valor: string;
}

export interface ProgramaDto {


    id: string,
    idColaborador: string,
    colaborador: string,
    estado: string,
    nombrePrograma: string,
    fechaCreacion: string,
    idColaboradorResponsable: string,
    nombreColaboradorResponsable: string,
    formato: Record<string, any>

}