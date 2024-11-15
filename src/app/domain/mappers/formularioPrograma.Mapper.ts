import { FormularioPrograma } from "../models/formulario.models";

export class FormularioProgramaMapper {
  static fromBackend(data: any): FormularioPrograma {
    return {
      idFormulario: data.idFormulario,
      programaId: data.programaId,
      nombrePrograma: data.nombrePrograma,
      colaboradorId: data.colaboradorId,
      estado: data.estado,
      campos: data.campos,
      fechaCreacion: data.fechaCreacion,
      valoresDiligenciados: data.valoresDiligenciados || []
    };
  }

  static toBackend(formulario: FormularioPrograma): any {
    return {
      programaId: formulario.programaId,
      nombrePrograma: formulario.nombrePrograma,
      colaboradorId: formulario.colaboradorId,
      campos: formulario.campos,
      valoresDiligenciados: formulario.valoresDiligenciados || [],
    };
  }
}