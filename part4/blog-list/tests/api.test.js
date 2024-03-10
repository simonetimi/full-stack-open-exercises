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

test('blogs count increases by one after posting one entry', async () => {
  const getResponse = await api.get('/api/blogs');
  const blogCount = getResponse.body.length;
  await api
    .post('/api/blogs')
    .send({
      title: 'Test',
      author: 'Test Author',
      url: 'http://test.test',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
    .expect(201);

  const updatedResponse = await api.get('/api/blogs');
  const body = updatedResponse.body;
  assert.strictEqual(body.length, blogCount + 1);
});

test('when likes property is missing, it will default to zero', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: 'Another test',
      author: 'Test Author',
      url: 'http://test.test',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
    .expect(201);

  assert.strictEqual(response.body.likes, 0);
});

test('if url property is missing, it should return bad request 400 error', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Yet another test',
      author: 'Test Author',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
    .expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
