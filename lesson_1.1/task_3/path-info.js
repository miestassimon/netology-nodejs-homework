const fs = require('fs');
const conf = {encoding: 'utf8'};

module.exports = pathInfo = (path, callback) => {
  let info = {};
  let error;

  try {
    let stats = fs.statSync(path);
    info.path = path;
    if (stats.isFile()) {
      info.type = 'file';
      info.content = fs.readFileSync(path, conf);
    }
    if (stats.isDirectory()) {
      info.type = 'directory';
      info.childs = fs.readdirSync(path, conf);
    }
  }
  catch(err) {
    error = err;
  }

  callback(error, info);
};