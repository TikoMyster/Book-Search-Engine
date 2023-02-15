const TypeDefs = `#graphql
    type User{
        _id:ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
        input savedBook{
            authors: [String]
            bookId: String
            link: String
            title: String
            description: String
            image: String
        }
        type Query {
            me: User
        }
        type Auth{
            token: ID!
            user: User
        }
        type Book{
            authors: [String]
            bookId: String
            link: String
            description: String
            image: String
        }
        type Mutation{
            addUser(username: String!, email: String!, password: String!): Auth
            login(email: String!, password: String! ): Auth
            saveBook(input: savedBook!): User
            removeBook(bookId: ID!): User

        }
        `;

module.exports = TypeDefs;