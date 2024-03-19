const _ = require('lodash');

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => accumulator + current.likes, 0);
};

const mostLiked = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const filteredBlog = blogs.filter((blog) => blog.likes === mostLikes);
  return filteredBlog[0];
};

const authorWithMostBlogs = (blogs) => {
  const authorCount = {};
  blogs.forEach((blog) => {
    if (authorCount[blog.author]) {
      authorCount[blog.author] += 1;
    } else {
      authorCount[blog.author] = 1;
    }
  });
  const arrayWithAuthorAndBlogsCount = _.maxBy(_.entries(authorCount), ([, blogs]) => blogs);
  return {
    author: arrayWithAuthorAndBlogsCount[0],
    blogs: arrayWithAuthorAndBlogsCount[1],
  };
};

const authorWithMostLikes = (blogs) => {
  const authorCount = {};
  blogs.forEach((blog) => {
    if (authorCount[blog.author]) {
      authorCount[blog.author] += blog.likes;
    } else {
      authorCount[blog.author] = blog.likes;
    }
  });
  const arrayWithAuthorAndLikesCount = _.maxBy(_.entries(authorCount), ([, likes]) => likes);
  return {
    author: arrayWithAuthorAndLikesCount[0],
    likes: arrayWithAuthorAndLikesCount[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  authorWithMostBlogs,
  authorWithMostLikes,
};
