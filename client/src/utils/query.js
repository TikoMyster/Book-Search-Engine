import { gql } from "@apollo/client";

export const GET_I= gql`
    query I {
        I {
        _id
        username
        email
        bookCount
        savedBooks {authors, description, bookId, image, link, title}
        }
    }`;