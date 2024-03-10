const usersRouter = require('express').Router();
const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { object, string } = require('yup');

usersRouter.use(express.json());
usersRouter.use(cors());

const userSchema = object({
  username: string().required().min(3, 'Username should be at least 3 characters long'),
  name: string().required(),
  password: string().required().min(3, 'Password should be at least 3 characters long'),
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const userToValidate = await userSchema.validate({
      username: request.body.username,
      name: request.body.name,
      password: request.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const newUser = {
      ...userToValidate,
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
