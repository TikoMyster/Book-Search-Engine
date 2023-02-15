import { gql } from "@apollo/client";

export const GET_I= gql`
    query I {
        i {
        _id
        username
        email
        bookCount
        savedBooks {authors, description, bookId, image, link, title}
        }
    }`;