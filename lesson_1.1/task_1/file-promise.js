const fs = require('fs');
const conf = {encoding: 'utf8'};

const read = (path) => {
  return new Promise((done, fail) => {
    fs.readFile(path, conf, (err, content) => {
      if (err) {
        return fail(err);
      } else {
        done(content);
      }
    });
  });
};

const write = (file, data) => {
  return new Promise((done, fail) => {
    fs.writeFile(file, data, conf, err => {
      if (err) {
        return fail(err);
      } else {
        done(`Данные сохранены в файл ${file}`)
      }
    })
  });
};

module.exports = {
  read,
  write,
};