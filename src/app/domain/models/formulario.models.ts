// models/formulario-programa.model.ts
export interface CampoFormulario {
  nombre: string;
  tipo: string;
}

export interface ValuesDiligenciados {
  fechaDiligencia: Date;

}

export interface FormularioPrograma {
  idFormulario?: string;
  programaId: string;
  nombrePrograma: string;
  colaboradorId: string;
  estado?: string;
  campos: CampoFormulario[];
  fechaCreacion?: string;
  valoresDiligenciados: ValuesDiligenciados[];
}