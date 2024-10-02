import { Observable } from "rxjs";
import { formProgramaRequest, responseFormPrograma } from "../../infrastructure/helpers/interfaces/formPrograma.interface"; 
export abstract class FormularioProgramaRepository {
    
    
    abstract crearFormulario(idColaborador:string, campos: formProgramaRequest): 
    Observable<responseFormPrograma>; 
}