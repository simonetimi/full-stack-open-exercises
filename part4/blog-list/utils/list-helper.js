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

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
};
