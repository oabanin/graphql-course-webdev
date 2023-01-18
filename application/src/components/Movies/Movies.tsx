import MoviesTable from "./MoviesTable";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DIRECTORS_LIST, GET_MOVIES } from "./moviesQuery";
import { ADD_MOVIE } from "./moviesMutations";

const Movies = () => {
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES, variables: { name: "" } }],
  });

  const { data } = useQuery(GET_DIRECTORS_LIST);
  const directors = data?.directors || [];

  if (error) return <>{error.message}</>;
  return (
    <div>
      <div>Movies</div>
      <MoviesTable />
      <Button
        onClick={() =>
          addMovie({
            variables: {
              name: `Test movie name ${Math.random()}`,
              genre: "Porn",
              rating: 1,
              watched: false,
              directorId: directors[0].id,
            },
          })
        }
        disabled={loading}
        variant="contained"
      >
        Add new director
      </Button>
    </div>
  );
};

export default Movies;
