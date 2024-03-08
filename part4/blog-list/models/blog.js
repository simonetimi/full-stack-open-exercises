const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config.js');

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
