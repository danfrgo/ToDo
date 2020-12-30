const express = require('express'); // importar express
const cors = require('cors');
const server = express(); // iniciar o servidor

server.use(cors());
server.use(express.json()); // para a API entender o formato JSON

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes); // intejar o ficheiro com as rotas


server.listen(3333, () =>{ // receber requiçoes na porta 3333
    console.log('API ONLINE');
});
