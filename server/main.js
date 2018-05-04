var express = require('express');
const mongoose 	= require('mongoose');
const config = require('../config.js');
const conversacionCtrl = require('../controlers/conversacion.js');
var app 	= express();

//Crear el servidor
var server 	= require('http').Server(app); 

/*Para el funcionamineto de socket con express creamos el servidor
a partir de la libreria http de nodejs*/
var io 		= require('socket.io')(server); // npm i socket.io -S

//Este totalMessages lo correcto es ir guardandolos en una bbdd
var totalMessages = [{
	id:1,
	texto: '¿Hola que tal?', 
	autor: 'Nestor Edrev'
}];

//Definir el directorio de la parte publica(estatica) (dentro del servidor) mediante el middleware static de express
app.use(express.static('public'));

app.get('/', function(req,res){
	//console.log('entroooo en /');
	//res.status(200).send({mensaje:'entrooooo'});
});

//escuchando mensajes que llegan al servidor
io.on('connection', function(socket){
	console.log('Alguien se ha conectado con Sockets');
	//emitiendo el mensaje al cliente
	socket.emit('messages',totalMessages);

	//Escuchar el evento new-message desde el cliente
	socket.on('new-message', function(data){
		var respuesta = conversacionCtrl.saveConversation(data);
		console.log(respuesta);
		totalMessages.push(data);

		//Vuelven a emitir a todos los clientes que escuchan por sockets
		//los mensajes nuevos que han sido enviados al servidor
		io.sockets.emit('messages', totalMessages);
	});
});

mongoose.connect(config.db, function(err,res){

	if(err)
	{
		return res.status(200).send({mensaje:`Error al conectar a la BBDD: ${err}`});
	}
	else
	{
		server.listen(config.port, function(){
			console.log('Servidor corriendo en http://localhost:8081/');
			console.log('Conexion a la bbdd con exito.');
		});
	}
})

