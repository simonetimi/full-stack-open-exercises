const blogsRouter = require('./controllers/blogs.js');
const logger = require('./utils/logger.js');
const express = require('express');
const app = express();
app.use('/api/blogs', blogsRouter);
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Wrong ID format' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'NotFoundError') {
    return response.status(404).json({ error: 'Resource not found' });
  }
  next(error);
};

app.use(errorHandler);

module.exports = app;
