import { Author } from './models/Authors.js';
import { GraphQLError } from 'graphql';
import { Book } from './models/Books.js';
import { User } from './models/Users.js';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: (author) => {
      try {
        return author.books.length;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch book count for author ${author.name}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },
  },
  Query: {
    me: (root, args, { user }) => {
      return user;
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        // no arguments, finds all books
        if (!args.author && !args.genre) {
          return await Book.find({}).populate('author');
        }

        // genre is the only arguments
        if (args.genre && !args.author) {
          return await Book.find({ genres: { $in: args.genre } }).populate('author');
        }

        // if author is an argument, we need to query the db and filter by author
        const author = await Author.findOne({ name: args.author });
        const filteredByAuthor = await Book.find({ author: author._id }).populate('author');

        // if we have genre as argument, also filter by genre, otherwise just return filteredByAuthor
        if (args.genre && args.author) {
          const filteredByAuthorAndGenre = filteredByAuthor.filter((book) =>
            book.genres.includes(args.genre)
          );
          return filteredByAuthorAndGenre;
        } else {
          return filteredByAuthor;
        }
      } catch (error) {
        throw new GraphQLError('Getting books failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      }
    },
    allAuthors: async () => {
      const response = await Author.find({});
      console.log(Author.find);
      return response;
    },
  },
  Mutation: {
    addBook: async (root, args, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError('User not authenticated!', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = await new Author({ name: args.author }).save();
        }
        const book = new Book({ ...args, author });
        await book.save();
        author.books.push(book);
        await author.save();
        pubsub.publish('BOOK_ADDED', { bookAdded: book });
        return book;
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError('User not authenticated!', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { token: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

export default resolvers;
