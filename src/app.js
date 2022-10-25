const express = require('express');
const { loginController, userController } = require('./controllers');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', loginController.login);
app.post('/user', userController.createUser);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `Algo deu errado! Mensagem: ${err.message}` });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
