const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands)

//Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje',function( payload) {
        console.log('Mensajeee!!', payload);
        io.emit('mensaje', {admin: 'Mensaje de retorno'});
    });

    client.on('vote-band',function( payload) {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band',function( payload) {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band',function( payload) {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    // client.on('emitir-mensaje',( payload) =>{
    // io.emit('nuevo-mensaje', payload); //Esto emite mensaje a todos
    //     client.broadcast.emit('nuevo-mensaje', payload);  //Esto emite mensaje a todos menos al cliente de origen 
    //     console.log(payload);}
    // );
});


