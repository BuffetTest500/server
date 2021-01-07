const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const shell = require('shelljs');
const env = process.env;

const initLoaders = app => {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use(cors({
    origin: env.ORIGIN_URI_PROD,
    credentials: true,
  }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  cron.schedule('0 0 */1 * * * *', () => {
    console.log('scheduler running every hour..');
    shell.exec('node utils/destroyOldHitData.js');
  });
};

module.exports = initLoaders;
