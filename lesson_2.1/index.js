const http = require('http');
const fs = require('fs');
const translate = (data) => require('./translator').translate(data);
const querystring = require('querystring');
const conf = {encoding: 'utf8'};

const port = 3000;
const base = './public';


function handler(req, res) {
  let type = req.method;
  let data = '';
  switch (type) {
    case 'GET':
      res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
      fs.createReadStream(base + '/form.html').pipe(res);
      break;
    case 'POST':
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        res.writeHead(200, 'OK', {
          'Content-Type': 'text/html',
          'Accept-Charset': 'utf-8'
        });
        parse(data)
          .then(translate)
          .then(out => res.write('<!doctype html>\n' +
            '<html lang="ru">\n' +
            '<head>\n' +
            '  <meta charset="UTF-8">\n' +
            '  <title>Переводчик</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '  <div>Перевод вашего слова: ' + out + '</div>\n' +
            '<div><a href="/">Вернуться на главную</a></div>\n' +
            '</body>\n' +
            '</html>'))
          .then(end => res.end())
          .catch(err => console.error(err));
      });
      break;
  }
}

function parse(data) {
  return new Promise((done, fail) => {
    done(querystring.parse(data)['word'])
  });
}

const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
  console.log('Start HTTP on port %d', port)
});
server.listen(port);
