const usersRouter = require('express').Router();
const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.use(express.json());
usersRouter.use(cors());

usersRouter.post('/', async (request, response, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const newUser = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };
    const user = new User(newUser);
    const result = await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
