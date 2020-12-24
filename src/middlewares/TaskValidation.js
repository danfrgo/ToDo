const TaskModel = require("../model/TaskModel");
const { ispast, isPast } = require("date-fns"); // verificar se data ja ocorreu

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress)
    return res.status(400).json({ error: "Macaddress é obrigatório" });
  else if (!type) return res.status(400).json({ error: "Tipo é obrigatório" });
  else if (!title)
    return res.status(400).json({ error: "Título é obrigatório" });
  else if (!description)
    return res.status(400).json({ error: "Descrição é obrigatória" });
  else if (!when)
    return res.status(400).json({ error: "Data e hora são obrigatórios" });
  else if (isPast(new Date(when)))
    return res
      .status(400)
      .json({ error: "Data e hora selecionados já não estão disponiveis" });
  else {
      // verificar se já há alguma tarefa alocada no dia e hora definidos
    let exists;

    // se existe ID entao posso atualizar
    if(req.params.id){
      exists = await TaskModel
      .findOne(
          { 
            '_id': {'$ne': req.params.id}, // para igonarar o id da propria tarefa e atualizar
              'when': {'$eq': new Date(when)},
              'macaddress': {'$in': macaddress} 
            });
  } else {

    // se nao ha esse ID entao é uma nova tarefa
    exists = await TaskModel
            .findOne(
                { 
                    'when': {'$eq': new Date(when)}, // na mesma data e horario
                    'macaddress': {'$in': macaddress} // com o mesmo macaddress
        });
      }

// se o exits estiver vazio entao pode registar caso contrario entra na validação e devolve mensagem de erro
if(exists){
    return res.status(400).json({ error: "Já existe uma tarefa nesse horário" });
}

    next();
  }
};

module.exports = TaskValidation;
