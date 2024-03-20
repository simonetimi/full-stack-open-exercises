const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const logger = require('./utils/logger.js');
const express = require('express');
const cors = require('cors');
const app = express();
const { extractToken } = require('./utils/middleware.js');
app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/blogs', extractToken, blogsRouter);
app.use('/api/users', usersRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

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
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  }
  next(error);
};

app.use(errorHandler);

module.exports = app;
