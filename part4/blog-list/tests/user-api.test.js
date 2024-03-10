const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const User = require('../models/user');

const api = supertest(app);

// initialize db for testing
beforeEach(async () => {
  await User.deleteMany({});
});
// user tests
describe.only('users creation must satisfy min requirements', () => {
  test.only('if user is created correctly', async () => {
    const response = await api
      .post('/api/users')
      .send({
        username: 'Username',
        name: 'Neo Anderson',
        password: 'wakeup',
      })
      .expect(201);

    assert.strictEqual(response.body.username, 'Username');
    assert.notStrictEqual(response.body.password, 'wakeup');
  });

  test.only('if it refuses duplicate user', async () => {
    await api.post('/api/users').send({
      username: 'Username',
      name: 'Neo Anderson',
      password: 'wakeup',
    });
    const response = await api
      .post('/api/users')
      .send({
        username: 'Username',
        name: 'Neo Anderson',
        password: 'wakeup',
      })
      .expect(400);

    assert(response.body.error === 'expected `username` to be unique');
  });

  test.only('if user creation is refused when username is less than 3 characters', async () => {
    const response = await api
      .post('/api/users')
      .send({
        username: 'Us',
        name: 'Neo Anderson',
        password: 'wakeup',
      })
      .expect(400);

    assert(response.body.username === undefined);
    assert(response.body.error === 'Username should be at least 3 characters long');
  });

  test.only('if user creation is refused when password is less than 3 characters', async () => {
    const response = await api
      .post('/api/users')
      .send({
        username: 'Username Test',
        name: 'Neo Anderson',
        password: 'wa',
      })
      .expect(400);

    assert(response.body.username === undefined);
    assert(response.body.error === 'Password should be at least 3 characters long');
  });
});

after(async () => {
  await mongoose.connection.close();
});
