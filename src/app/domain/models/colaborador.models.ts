
export class Colaborador{
  
    constructor(
        public idColaborador: string,
        public tipoIdentificacion: string,
        public numeroIdentificacion: number,
        public nombreColaborador: string,
        public estado: string,
        public fechaCreacion: string,
        public fechaModificacion: string,
    ){}

}