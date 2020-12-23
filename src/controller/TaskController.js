const TaskModel = require('../model/TaskModel');

class TaskController {
    // criar nova tarefa
    async create (req, res){
        const task = new TaskModel(req.body); // para receber as requisiçoes que constam no TaskModel
        await task
        .save()
        .then(response => {
            return res.status(200).json(response);

        } )
        .catch(error => {
            return res.status(500).json(error);
        });  // then se está tudo OK devolve a resposta, e catch se houverem erros e fazer a respetiva captura
    }
}

module.exports = new TaskController();