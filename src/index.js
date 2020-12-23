const express = require('express'); // importar express
const server = express(); // iniciar o servidor

server.get('/teste', (req, res) =>{
    res.send('CHANGE API');
});

server.listen(3000, () =>{ // receber requiçoes na porta 3000
    console.log('API ONLINE');
});