import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

schema.plugin(uniqueValidator);

export const Author = mongoose.model('Author', schema);
