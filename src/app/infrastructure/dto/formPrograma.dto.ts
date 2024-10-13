
export interface CampoDTO {
  nombre: string;
  tipo: string;  // Ej: 'string', 'number', etc.
}

export interface ValorDiligenciadoDTO {
  nombreCampo: string;
  valor: any;  // Puede ser de cualquier tipo (string, number, boolean, etc.)
}

export interface DiligenciaDTO {
  fechaDiligencia: string;  // Fecha en formato ISO string
  valores: ValorDiligenciadoDTO[];
}

export interface FormularioProgramaDTO {
  idFormulario: string;  // UUID del formulario
  programaId: string;  // ID del programa relacionado
  nombrePrograma: string;  // Nombre del programa relacionado
  colaboradorId: string;  // ID del colaborador que crea el formulario
  estado: string;  // Estado del formulario (por defecto "ACTIVO")
  campos: CampoDTO[];  // Lista de campos dinámicos que se deben diligenciar
  valoresDiligenciados?: DiligenciaDTO[];  // (Opcional) Múltiples conjuntos de valores diligenciados
  fechaCreacion: string;  // Fecha de creación en formato ISO string
  formato: Record<string, any>

}