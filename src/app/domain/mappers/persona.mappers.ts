import { PersonaDto } from "../../infrastructure/dto/persona.dto";
import { Persona } from "../models/persona.models";
import { Programa } from "../models/programa.models";

export class PersonaMapper {

    static personaToPersonaDto(persona: Persona, programa: Programa): PersonaDto {
        return {
            idPersona: persona.idPersona,
            programa: programa.nombrePrograma,
            fechaRegistro: persona.fechaRegistro,
            estado: persona.estado,
            datos: persona.datos
        }
    }

    static personaDtoToPersona(personaDto: PersonaDto, programa: Programa): Persona {
        return {
            idPersona: personaDto.idPersona,
            programa: programa.idPrograma,
            fechaRegistro: personaDto.fechaRegistro,
            estado: personaDto.estado,
            datos: personaDto.datos
        }
    }

}