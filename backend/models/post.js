const mongoose = require ('mongoose');

const postScheme = mongoose.Schema({
  title: {type: String, required: true},
  direccion: {type: String, required: true},
  telefono: {type: String, required: true},
  caja: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postScheme);
