
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
    ColaboradorResponsable: string,
    informacion: InformacionDTO[];
    formato: Record<string, any>
    nombreColaboradorResponsable: string;
    idPrograma: string;
    colaboradorCreador: string;
    formatosActividades: {
        fechaCreacion: String,
        archivos: [
            {
            name: String,
            webUrl: String,
            downloadUrl: String
            }
        ]
    },
}