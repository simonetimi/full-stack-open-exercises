const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config.js');

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, Ref: 'User' },
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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
