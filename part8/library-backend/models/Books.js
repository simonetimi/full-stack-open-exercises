import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator);

export const Book = mongoose.model('Book', schema);
