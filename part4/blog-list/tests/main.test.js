const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list-helper');
const { listWithOneBlog, listWithMultipleBlogs } = require('../utils/dummy-data');

test('dummy returns 1', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test('when list has only multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 36);
  });
});
