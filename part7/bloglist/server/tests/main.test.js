const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list-helper');
const { listWithOneBlog, listWithMultipleBlogs, mostLikedBlog } = require('../utils/dummy-data');

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

describe('most liked blog', () => {
  test('should return the most liked blog', () => {
    const result = listHelper.mostLiked(listWithMultipleBlogs);
    assert.deepStrictEqual(result, mostLikedBlog);
  });
});

describe('author with most blogs', () => {
  test('should return the author with the biggest number of blogs', () => {
    const result = listHelper.authorWithMostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('author with most likes', () => {
  test('should return the most liked author with the number of likes', () => {
    const result = listHelper.authorWithMostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
