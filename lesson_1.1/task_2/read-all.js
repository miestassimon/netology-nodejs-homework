const fs = require('fs');
const conf = {encoding: 'utf8'};

module.exports = readAll = (path) => {
  let allFiles = [];
  return new Promise((done, fail) => {
    fs.readdir(path, conf, (err, files) => {
      if (err) {
        fail(err);
      } else {
        files.forEach((file) => {
          allFiles.push({
            name: file,
            content: fs.readFileSync(path + file, conf, (err) => {
              if (err) fail(err);
            }),
          });
        });
        done(allFiles);
      }
    });
  });
};