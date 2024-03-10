const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const logger = require('./utils/logger.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Wrong ID format' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'NotFoundError') {
    return response.status(404).json({ error: 'Resource not found' });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response.status(400).json({ error: 'expected `username` to be unique' });
  }
  next(error);
};

app.use(errorHandler);

module.exports = app;
