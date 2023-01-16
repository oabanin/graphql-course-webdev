import MoviesTable from "./MoviesTable";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GET_MOVIES } from "./moviesQuery";
import { ADD_MOVIE } from "./moviesMutations";

const Movies = () => {
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      { query: GET_MOVIES }, // DocumentNode object parsed with gql
    ],
  });

  if (error) return <>error.message</>;
  return (
    <div>
      <div>Movies</div>
      <MoviesTable />
      <Button
        onClick={() =>
          addMovie({ variables: { name: `Test movie name ${Math.random()}` } })
        }
        disabled={loading}
        variant="contained"
      >
        Add new director
      </Button>
    </div>
  );
};

export default Movies