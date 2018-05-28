const fs = require('fs');
const input = fs.createReadStream('in.txt');
const output = fs.createWriteStream('out.txt');
const crypto = require('crypto');
const hash = crypto.createHash('md5');

const Transform = require('stream').Transform;

class CTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push((chunk).toString('hex'));
    callback();
  }
}

const hashTransform = new CTransform();

input.pipe(hash).pipe(hashTransform).pipe(output);
hashTransform.pipe(process.stdout);
