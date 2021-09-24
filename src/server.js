//definicion del servidor
const express = require('express');
const server = express();
const cors = require('cors');
const usersRouter = require('./routers/users')
const recordsRouter = require('./routers/records')
const authRouter = require("./routers/auth");
const vacanciesRouter = require("./routers/vacancies");
const applicationsRouter = require('./routers/applications');

//middleware
server.use(cors())
server.use(express.json());

//routers
server.use("/users",usersRouter);
server.use("/records",recordsRouter);
server.use("/auth",authRouter);
server.use("/vacancies",vacanciesRouter);
server.use("/applications",applicationsRouter);


//exportar server
module.exports = server;