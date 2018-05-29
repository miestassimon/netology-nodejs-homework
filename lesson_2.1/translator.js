const https = require('https');
const key = 'trnsl.1.1.20180528T220214Z.a72b08123a753f88.154ef6dd42a21bfe9a3fd606e19acd4878a9a5e8';
const lang = 'ru-en';

// const yaReq = (options, callback) => https.get(options, callback);

const translate = (text) => {
  return new Promise((done, fail) => {
    let reqOption = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key +'&text=' + text + '&lang=' + lang;
    https.get(reqOption, (res) => {
      console.log(reqOption);

      res.setEncoding('utf8');

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        done(JSON.parse(data)['text'][0]);
      });
      res.on('error', err => console.error(err));

    });

  });
};

module.exports = {translate};
