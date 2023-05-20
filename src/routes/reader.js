const express = require('express');
const { addReader } = require('../controllers/reader');

const readerRouter = express.Router();

readerRouter.route('/').post(addReader);

module.exports = readerRouter;
