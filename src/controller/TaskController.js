const { response } = require('express');
const TaskModel = require('../model/TaskModel');

const current = new Date(); // para guardar hora e data atual para comparaçoes

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

    // editar tarefa
    async update(req, res){
        //  {new: true} -> para retornar sempre os dados da tarefa atualizados na resposta (.then)
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response); // response devolve a tarefa atualizada com o operador new acima
        })
        // se erro, capturar
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    // listar todas as tarefas
    async all(req, res){
        // filtrar por macaddress de cada dispositivo
        await TaskModel.find({macaddress: {'$in': req.body.macaddress}})
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    //tarefa por ID
    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {
            //verificar se a tarefa existe (verificar se existe resposta)
            if(response)
            return res.status(200).json(response);
            else
            return res.status(404).json({error: 'Tarefa não encontrada'});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });  
    }

    //colocar o status da tarefa como terminado
    async done(req,res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done}, //passar true or false
            {new: true}// para devolver os dados da tarefa atualizados
            )
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });

    }
    
    // tarefas em atraso (less than)
    async late(req, res){
        await TaskModel
        .find({
            'when': {'$lt' : current},
            'macaddress': {'$in': req.body.macaddress} // filtrar por macaddress para identificar apenas um telemovel
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

}

module.exports = new TaskController();