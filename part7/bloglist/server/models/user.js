const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config.js');

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, Ref: 'Blog' }],
});

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

userSchema.set('toJSON', {
  virtuals: true,
});
userSchema.set('toObject', {
  virtuals: true,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.hashedPassword;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
