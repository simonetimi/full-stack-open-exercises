import { gql } from 'graphql-tag';

const typeDefs = gql(`
  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
    favoriteGenre: String
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
   favoriteGenre: String
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

export default typeDefs;
