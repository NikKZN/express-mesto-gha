const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const { signupValidation, signinValidation } = require('./middlewares/validation');
const Error404 = require('./errors/error404');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.use(auth);
app.use('*', () => {
  Error404('Страница не найдена!');
});

app.use(errors());

app.use(errHandler);

app.listen(PORT);
