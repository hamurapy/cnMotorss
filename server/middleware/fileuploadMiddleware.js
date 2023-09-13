const path = require('path');
const util = require('util');
const fs = require('fs');
const crypto = require('crypto');
const HEICConvert = require('heic-convert');

const storage = async (file) => {
  const fileName = file.originalname;
  const extension = path.extname(fileName);

  const allowedExtensions = /png|jpeg|jpg|gif|Webp|heic/i;

  if (!allowedExtensions.test(extension)) {
    throw new Error('Unsupported extension!');
  }

  let { buffer } = file;

  if (extension.toLowerCase() === '.heic') {
    const convertedBuffer = await HEICConvert({
      buffer: file.buffer,
      format: 'JPEG',
    });
    buffer = convertedBuffer;
  }

  const md5 = crypto.createHash('md5').update(buffer).digest('hex');
  const URL = `/img/${md5}${extension}`;

  await util.promisify(fs.writeFile)(`./public${URL}`, buffer);
  return URL;
};

module.exports = storage;
