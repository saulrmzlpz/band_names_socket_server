const express =  require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Socket server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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


//Carpeta pública
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath))

server.listen(process.env.PORT, (err)=>{

    if(err) throw new Error(err);
    
    console.log('Servidor corriendo en puerto', process.env.PORT);
});