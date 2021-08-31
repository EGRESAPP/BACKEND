//definicion del servidor
const express = require('express');
const server = express();
const cors = require('cors');

//middleware
server.use(cors())
server.use(express.json());

//routers


//exportar server
module.exports = server;