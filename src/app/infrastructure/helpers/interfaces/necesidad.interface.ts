import { NecesidadDTO } from "../../dto/necesidad.dto"

export interface necesidadRequest {
    necesidades: NecesidadDTO[];
  }

  export interface responseNecesidad {
    message: string;
    registro: {
      _id: string;
      necesidades: Array<{
        item: number;
        necesidadIdentificada: string;
        causas: string;
        impacto: string;
        poblacionAfectada: string;
        prioridad: string;
        recursosNecesarios: string;
        estrategiasIntervencion: string;
        indicadoresExito: string;
        _id: string;
      }>;
      fechaRegistro: string;
      __v: number;
    };
  }