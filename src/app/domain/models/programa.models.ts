import { InformacionDTO } from "../../infrastructure/dto/programa.dto";
export class Programa {

    constructor (
        public idPrograma: string,
        public nombrePrograma: string,
        public fechaCreacion: string,
        public estado: string,
        public formato: Record<string,any>,
        public colaboradorCreador: string,
        public ColaboradorResponsable: string,
        public informacion: InformacionDTO[] // Array para campos dinámicos
    ){}


}