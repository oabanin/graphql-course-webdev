import {gql} from "@apollo/client";

export const GET_DIRECTORS = gql`
    query directorsQuery {
        directors {
            id
            name
            age
            movies {
                name
            }
        }
    }`;
