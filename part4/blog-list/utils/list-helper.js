const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => accumulator + current.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
