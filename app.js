import express from 'express';
import bodyParser from 'body-parser';
const app = express();


//to get router
import usersRouter from './router/user.router.js';
app.use(express.json());
app.use(bodyParser());

// const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(3001);
console.log("server started at http://localhost:3001");
