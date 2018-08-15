class Usuarios {
    constructor() {
        this.personas = [];
    }


    agregarPersona(idPersona, nombrePersona, sala) {
        // Se crea una persona
        let persona = { idPersona, nombrePersona, sala };
        // Se agrega a al arreglo de persona
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(idPersona) {
        // filter retorna un arreglo por ende se retorna la primera posición que coincida con el id.
        let persona = this.personas.filter(persona => persona.idPersona === idPersona)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(idPersona) {
        //  se sete el arreglo con todos lo valores diferentes al id
        let personaBorrada = this.getPersona(idPersona);
        this.personas = this.personas.filter(persona => persona.idPersona != idPersona);


        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}