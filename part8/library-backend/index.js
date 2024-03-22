import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { Author } from './models/Authors.js';
import { Book } from './models/Books.js';
import { User } from './models/Users.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const typeDefs = gql(`
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
   username: String!
   password: String!
   id: ID!
}

  type Token {
    token: String!
}
  type Mutation {
    addBook(
      title: String!    
      published: Int!
      author: String!
      genres: [String!]!
      ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
    username: String!
    favoriteGenre: String!
    ): User,
    login(
    username: String!
    password: String!
    ): Token
  }
`);

const resolvers = {
  Query: {
    me: (root, args, { user }) => {
      return user;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
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
      return await Author.find({});
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.id);
      return { user };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
