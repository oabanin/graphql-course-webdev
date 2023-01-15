import {gql} from "@apollo/client";

export const GET_MOVIES = gql`
    query moviesQuery {
        movies {
            id
            name
            genre,
            rating,
            watched,
            director {
                name
            }
        }
    }`;
