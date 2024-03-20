const blogsRouter = require('express').Router();
const express = require('express');
const cors = require('cors');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.use(express.json());
blogsRouter.use(cors());

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate({
      path: 'user',
      select: 'username name',
      model: User,
    });
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
    if (!request.username) {
      const error = new Error('Token not found');
      error.status = 403;
      throw error;
    }
    const user = await User.findOne({ username: request.username });
    // adds user id to the blog entry
    const blog = new Blog({ ...request.body, user: user._id });
    const result = await blog.save();
    await result.populate({
      path: 'user',
      select: 'username name',
      model: User,
    });
    // adds blog id to the blogs array in user
    user.blogs.push(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    if (!request.username) {
      const error = new Error('Token not found');
      error.status = 403;
      throw error;
    }
    const id = request.params.id;
    const result = await Blog.findById(id);
    if (!result.user.toString().includes(request.userId)) {
      const error = new Error('User not authorized');
      error.status = 401;
      throw error;
    }
    await Blog.findByIdAndDelete(id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: request.body.user,
    };
    const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
    if (result) {
      response.json(result);
      response.status(200).end();
    } else {
      response.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});

// comments

blogsRouter.get('/:id/comments/', async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id);
    response.json(blog.comments);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id/comments', async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id);
    blog.comments.push(request.body.comment);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
