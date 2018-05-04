// connect recibe a la direccion donde tiene que apuntar y objeto de conexion
var socket = io.connect('http://localhost:8081', {'forceNew':true});

//Escuchando el mensaje: messages desde el servidor mediante socket
socket.on('messages', function(data){
	console.log(data);
	render(data);
})

function render(data)
{
	// como data es un array de objetos hay que recorrerlos mediante el metodo map
	// Hay que utilizar el join para inidicarle el separador del map y evitar las comas entre los objtos
	var html = data.map(function(elem, index){
				//Hace un return por cada elemento recorrido
				return(`<div>
						<strong>${elem.autor}</strong>:
						<em>${elem.texto}</em>
					</div>`);
			}).join(" ");


	document.getElementById("mensajes").innerHTML = html;
}

function addMessage(e)
{
	getId = Math.floor((Math.random() * 1000000000) + 1);
	console.log('El Id es ----> '+getId);
	var sendMessage = {
		id: getId,
		autor: document.getElementById('username').value,
		texto: document.getElementById('texto').value
	};

	//Emitir el mensaje desde el cliente al servidor mediante socket
	socket.emit('new-message', sendMessage);

	return false;
}