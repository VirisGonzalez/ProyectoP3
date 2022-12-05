const mongoose = require ('mongoose');

const petScheme = mongoose.Schema({
  nombre: {type: String, required: true},
  edad: {type: String, required: true},
  peso: {type: String, required: true},
  caja: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Pet', petScheme);
