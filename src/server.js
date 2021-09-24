//definicion del servidor
const express = require('express');
const server = express();
const cors = require('cors');
const usersRouter = require('./routers/users')
const authRouter = require("./routers/auth");
const vacanciesRouter = require("./routers/vacancies");
//middleware
server.use(cors())
server.use(express.json());

//routers
server.use("/users",usersRouter);
server.use("/auth",authRouter);
server.use("/vacancies",vacanciesRouter);


//exportar server
module.exports = server;