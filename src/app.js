const express = require('express');
const { userController } = require('./controllers');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { authRouter } = require('./routers');
require('express-async-errors');

const app = express();
app.use(express.json());

app.use('/login', authRouter);
app.post('/user', userController.createUser);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
