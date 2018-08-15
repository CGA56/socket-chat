const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();
/**
 *  Una de las propiedades del client es el id , que es unico para cada usuario que se conecta a nuestra app.
 */
io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala es  necesario'
            });
        }

        // Para conectar a un usuario a una sala
        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        //  Si nodemon no reconoce el callback como funcion , recargar el navegador
        callback(usuarios.getPersonasPorSala(data.sala));


    });

    client.on('disconnect', () => {

        let personBorrada = usuarios.borrarPersona(client.id);
        // console.log('Persona borrada', personBorrada);

        client.broadcast.to(personBorrada.sala).emit('crearMensaje', crearMensaje('administrador', `${personBorrada.nombrePersona} salio.`));
        // callback(personBorrada);
        client.broadcast.to(personBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personBorrada.sala));

    });


    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombrePersona, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    //   lo que ara el servidor cuando alguien quiere enviar un mensaje privado
    client.on('mensajePrivado', data => {
        if (!data.mensaje) {
            return callback({
                error: true,
                mensaje: 'El mensaje es necesario'
            });
        }
        let persona = usuarios.getPersona(client.id);
        //    Para enviar a una persona en especifico (para es el id)
        //  por consola del navegador
        /**
         * socket.emit('mensajePrivado',{mensaje:'hola cristopher como estas',para:'_G7Ul92gKEihsd5fAAAD'});
         */
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombrePersona, data.mensaje));
    });
});