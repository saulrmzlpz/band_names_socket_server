const { io } = require('../index')
//Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje',function( payload) {
        console.log('Mensajeee!!', payload);
        io.emit('mensaje', {admin: 'Mensaje de retorno'});
    });
  });