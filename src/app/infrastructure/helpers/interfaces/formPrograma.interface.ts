import { FormularioProgramaDTO} from "../../dto/formPrograma.dto";

export interface formProgramaRequest {

   // programaId: string;
   idPrograma: string;
    formato: Record<string, any>
}
//se esta utilizando para crear formulario y obtener formulario por ID
export interface responseFormPrograma {
    formulario: {
        idFormulario: string;
        nombrePrograma: string;
        estado: string;
        campos: Array<{
          nombre: string;
          tipo: string;
        }>;
        valoresDiligenciados: Array<{
          fechaDiligencia: string;
          valores: Array<{
            nombreCampo: string;
            valor: any;
          }>
        }>;
      };
}
// Define el tipo de cada campo del formulario
export interface CampoFormulario {
    nombre: string;
    tipo: string;  // 'string', 'number', etc.
  }

  export interface DiligenciarFormularioRequest {
    idFormulario: string;
    colaboradorId: string;
    valores: {
      nombreCampo: string;
      valor: any; // Puede ser string, number, etc.
    }[];
  }
  export interface ResponseDiligenciarFormulario {
    message: string;
    formulario: any;
  }
