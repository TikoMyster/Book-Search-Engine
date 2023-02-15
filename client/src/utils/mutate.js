import { gql } from "@apollo/client";

export const Login_User = gql`
   mutation Login($email: String!, #password: String!){
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
   }`;

export const Add_User = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const Save_Book = gql`
    mutation SaveBook($input: savedBook!) {
        saveBook (input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }`;

export const Remove_Book = gql `
    mutation RemoveBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }`;