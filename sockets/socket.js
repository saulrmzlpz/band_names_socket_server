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

    client.on('emitir-mensaje',( payload) =>{
        // io.emit('nuevo-mensaje', payload); //Esto emite mensaje a todos
        client.broadcast.emit('nuevo-mensaje', payload);  //Esto emite mensaje a todos menos al cliente de origen 
        console.log(payload);}
    );
});


