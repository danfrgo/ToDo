// criar rotas

const express = require('express');
const router = express.Router(); // para identificar as rotas

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
// const MacaddressValidation = require('../middlewares/MacaddressValidation'); //ja nao esta em uso

// primeiro executa o middleware e so depois o Create
router.post('/',TaskValidation, TaskController.create);
router.put('/:id',TaskValidation, TaskController.update); // rota com id tem que ser = ao definido no update da TaskController
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);
router.put('/:id/:done',TaskController.done);

// atualizaçao -> passar o macaddress por parametro e nao por body
router.get('/filter/all/:macaddress',    TaskController.all);
router.get('/filter/late/:macaddress',   TaskController.late);
router.get('/filter/today/:macaddress',  TaskController.today);
router.get('/filter/week/:macaddress',   TaskController.week);
router.get('/filter/month/:macaddress',  TaskController.month);
router.get('/filter/year/:macaddress',   TaskController.year);

module.exports = router;