
export interface AsistenciaRequest {
  numeroDocumento: string;
  nombreActividad: string;
}

export interface AsistenciaResponse {
  message: string;
}

export interface AsistenciaActividad {
  actividad: string;
  totalAsistentes: number;
}