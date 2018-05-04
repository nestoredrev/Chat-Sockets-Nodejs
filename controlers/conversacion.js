// importar el Schema de la conversacion

var Conversacion = require('../models/conversacion.js');
var express = require('express');

function saveConversation(data)
{
	var conversation = new Conversacion();
	conversation.mensajes.push(data);

	conversation.save(function(err,conversationStored){
		if(err)
		{
			/*return ({ 	status: 'KO',
						mensaje:`Ha ocurrido un error interno: ${err}`
					});*/
		}
		else
		{
			/*return ({ 	status: 'OK',
						conversation:conversationStored
					});*/
		}
	});
}

module.exports = {
	saveConversation
}