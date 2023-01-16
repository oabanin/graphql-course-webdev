import DirectorsTable from "./DirectorsTable";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_DIRECTOR } from "./directorsMutations";
import { GET_DIRECTORS } from "./directorsQuery";

const Directors = () => {
  const [addDirector, { loading, error }] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [
      { query: GET_DIRECTORS }, // DocumentNode object parsed with gql
    ],
  });
  if (error) return <>error.message</>;
  return (
    <div>
      <DirectorsTable />
      <Button
        onClick={() =>
          addDirector({
            variables: {
              name: `Test director name ${Math.random()}`,
              age: 444,
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

export default Directors;
