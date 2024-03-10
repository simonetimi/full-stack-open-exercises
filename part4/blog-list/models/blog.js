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

blogSchema.virtual('id').get(function () {
  return this._id.toString();
});

blogSchema.set('toJSON', {
  virtuals: true,
});
blogSchema.set('toObject', {
  virtuals: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
