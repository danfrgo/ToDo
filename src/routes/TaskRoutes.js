// criar rotas

const express = require('express');
const router = express.Router(); // para identificar as rotas

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacaddressValidation = require('../middlewares/MacaddressValidation');

// primeiro executa o middleware e so depois o Create
router.post('/',TaskValidation, TaskController.create);
router.put('/:id',TaskValidation, TaskController.update); // rota com id tem que ser = ao definido no update da TaskController
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);
router.put('/:id/:done',TaskController.done);

router.get('/filter/all', MacaddressValidation, TaskController.all);
router.get('/filter/late', MacaddressValidation, TaskController.late);

module.exports = router;