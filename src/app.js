const express = require('express');
const swaggerUI = require('swagger-ui-express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { authRouter, userRouter, categoryRouter, postRouter } = require('./routers');
const swaggerDocs = require('./swagger.json');
require('express-async-errors');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
