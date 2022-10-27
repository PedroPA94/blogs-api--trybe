const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { authRouter, userRouter, categoryRouter, postRouter } = require('./routers');
require('express-async-errors');

const app = express();
app.use(express.json());

app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
