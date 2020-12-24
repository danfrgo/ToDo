// criar rotas

const express = require('express');
const router = express.Router(); // para identificar as rotas

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

// primeiro executa o middleware e so depois o Create
router.post('/',TaskValidation, TaskController.create);

module.exports = router;