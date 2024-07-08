
export class Colaborador{
  
    constructor(
        public idColaborador: string="",
        public tipoIdentificacion: string="",
        public numeroIdentificacion: number=0,
        public nombreColaborador: string="",
        public estado: string= "",
        public fechaCreacion: string="",
        public fechaModificacion: string="",
    ){}

}