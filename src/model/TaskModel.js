const mongoose = require('../config/database'); // devolve o mongoose já conectado
const Schema = mongoose.Schema; // Schema é a representaçao de informaçoes que vao ser armazenados na BD


const TaskSchema = new Schema({
    macaddress: {type: String, required: true}, // obter o macadress do telemovel
    type: {type: Number, required: true}, // tipo de tarefa
    title: {type: String, required:true},
    description: {type: String, required:true},
    when: {type: Date, required:true}, // gravar data e hora juntos
    done: {type: Boolean, default:false},
    created: {type: Date, default: Date.now()} // data auto quando cria evento
});

//nome 'Task' e objeto "TaskSchema"
module.exports = mongoose.model('Task', TaskSchema); // para exportar o modulo para outros ficheiros