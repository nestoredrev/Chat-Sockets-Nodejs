var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversacionSchema = new Schema({
	fechaCreacion: {type: Date, default: Date.now},
	mensajes: []
});

module.exports = mongoose.model('Conversacion',conversacionSchema);