const express = require('express'); // importar express
const server = express(); // iniciar o servidor

server.use(express.json()); // para a API entender o formato JSON

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes); // intejar o ficheiro com as rotas


server.listen(3000, () =>{ // receber requiçoes na porta 3000
    console.log('API ONLINE');
});