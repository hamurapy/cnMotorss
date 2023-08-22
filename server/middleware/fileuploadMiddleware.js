/* eslint-disable no-throw-literal */
const path = require('path');
const util = require('util');
const fs = require('fs');
const crypto = require('crypto');

const storage = async (file) => {
  const fileName = file.originalname; // Используйте оригинальное имя файла
  const extension = path.extname(fileName);

  const allowedExtensions = /png|jpeg|jpg|gif|Webp/i; // Используйте регистронезависимое регулярное выражение

  if (!allowedExtensions.test(extension)) {
    throw new Error('Unsupported extension!');
  }

  if (file.size > 5000000) {
    throw new Error('File must be less than 5MB');
  }

  const md5 = crypto.createHash('md5').update(file.buffer).digest('hex'); // Вычислите MD5 хеш
  const URL = `/img/${md5}${extension}`;

  await util.promisify(fs.writeFile)(`./public${URL}`, file.buffer); // Запишите содержимое буфера в файл

  return URL;
};

module.exports = storage;
