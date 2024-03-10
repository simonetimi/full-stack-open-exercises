const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/blog');
const { initialBlogs } = require('../utils/test-db-init');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogSaves = initialBlogs.map((blogData) => {
    const blog = new Blog(blogData);
    return blog.save();
  });
  await Promise.all(blogSaves);
});

test('blogs are retrieved correctly as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
test('blogs are identified by "id" property', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
    .expect(200);

  const body = response.body;
  const blogPost = body[0];
  assert(blogPost !== undefined);
  assert(blogPost.id !== undefined);
});

after(async () => {
  await mongoose.connection.close();
});
