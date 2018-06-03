const express = require('express');
const bp = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bp.json());

let checkHeader = (req, res, next) => {
  return req.is('application/json') ? true : false;
};


app.get('/', (req, res) => {
  res.send('Hello, Express.js');
});

app.get('/hello', (req, res) => {
  res.send('Hello stranger!');
});

app.get('/hello/:name', (req, res) => {
  res.send('Hello, ' + req.params.name);
});

app.all('/sub\*', (req, res) => {
  res.send('You requested URI: ' + req.path);
});

app.post('/post', (req, res) => {
  if (Object.keys(req.body).length !== 0) {

    if (checkHeader(req) === false) {
      res.status(401);
      res.send();
    } else {
      res.send(req.body);
    }

  } else {
    res.status(404);
    res.send('404 Not Found');
  }
});

app.listen(PORT, () => console.log('Сервер запущен на порту %d', PORT));
