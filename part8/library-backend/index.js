import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { Author } from './models/Authors.js';
import { Book } from './models/Books.js';
import 'dotenv/config';

const typeDefs = gql(`
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
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
    ): Author
  }
`);

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
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
    },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await new Author({ name: args.author }).save();
      }
      const book = new Book({ ...args, author });
      await book.save();
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
