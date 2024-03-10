const blogsRouter = require('express').Router();
const express = require('express');
const cors = require('cors');
const Blog = require('../models/blog');

blogsRouter.use(express.json());
blogsRouter.use(cors());

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id);
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await Blog.findByIdAndDelete(id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
