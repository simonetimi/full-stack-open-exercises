import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 2,
  },
});

schema.plugin(uniqueValidator);

export const User = mongoose.model('User', schema);
