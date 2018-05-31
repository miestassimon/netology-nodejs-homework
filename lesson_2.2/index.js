const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let users = [];


app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const id = users.length;
  if (!req.body['name'] || !req.body['score']) {
    res.status(400);
    res.send('Вы прислали неполные данные! У пользователя должны быть поля name и score.')
  } else {
    users.push(req.body);
    res.json({id});
  }
});

app.get('/users', (req, res) => {
  res.json(users.filter(user => user));
});

app.put('/users/:userId', (req, res) => {
  let user = users[req.params.userId];
  if (user) {
    user = Object.assign(user, req.body);
    users[req.params.userId] = user;
    res.json(user);
  } else {
    res.status(404);
    res.send('Пользователь не найден');
  }
});

app.delete('/users/:userId', (req, res) => {
  users[req.params.userId] = null;
  res.send(`Пользователь ${req.params.userId} удален`);
});

app.listen(3000, () => console.log('Sever listening on port 3000'));