import { gql } from "@apollo/client";

export const GET_IT= gql`
    query IT {
        it {
        _id
        username
        email
        bookCount
        savedBooks {authors, description, bookId, image, link, title}
        }
    }`;