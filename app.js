const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62ac4bb57fe06120c127d28c',
  };

  next();
});

app.use((req, res, next) => {
  req.card = {
    _id: '62ad4606c3aec5fa39715848',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', cardsRoutes);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена!' });
});

app.listen(PORT);
