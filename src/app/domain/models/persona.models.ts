
export class Persona {

    constructor(
        public idPersona: string,
        public programa: string,
        public fechaRegistro: string,
        public estado: string,
        public datos: Record<string, any> //json
    ){}

}