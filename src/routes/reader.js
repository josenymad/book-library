const express = require('express');
const { addReader, getAllReaders, getReader, updateReader, deleteReader } = require('../controllers/reader');

const readerRouter = express.Router();

readerRouter.route('/').post(addReader).get(getAllReaders);

readerRouter.route('/:id').get(getReader).patch(updateReader).delete(deleteReader);

module.exports = readerRouter;
