var socket = io();


var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Personas conectadas', resp);
    });



});


// escuchar
socket.on('disconnect', function() {

    // console.log('Usuario desconectado', resp);

    console.log('Perdimos conexión con el servidor');



});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//Escuchar cambios cuando un usuario se conecta
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

// Enviar mensajes privados

socket.on('mensajePrivado', function(mensajePrivado) {
    console.log('Mensaje privado', mensajePrivado);
});