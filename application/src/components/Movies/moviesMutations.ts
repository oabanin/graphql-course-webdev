import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation addMovie(
    $name: String!
    $genre: String!
    $rating: Int
    $watched: Boolean!
    $directorId: ID!
  ) {
    addMovie(
      name: $name
      genre: $genre
      rating: $rating
      watched: $watched
      directorId: $directorId
    ) {
      name
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      name
    }
  }
`;
