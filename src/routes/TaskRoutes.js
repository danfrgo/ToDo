// criar rotas

const express = require('express');
const router = express.Router(); // para identificar as rotas

const TaskController = require('../controller/TaskController');


router.post('/', TaskController.create);

module.exports = router;