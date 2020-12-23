const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo';
mongoose.connect(url, {useNewUrlParser: true} ); //useNewUrlParser para ter compatibilidade com outras versoes mongo

module.exports = mongoose; // para utilizar a constante mongoose noutros ficheiros ao longo do projecto