const path = require('path');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const sessionConfig = require('./session');

const { getUser } = require('../middleware/getUser');

module.exports = function config(app) {
  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(getUser);
  app.use(cookieParser());
  app.use(session(sessionConfig));
};
