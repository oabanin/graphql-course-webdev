import { useMutation, useQuery } from "@apollo/client";
import { GET_MOVIES } from "./moviesQuery";
import { Fragment, useState } from "react";
import { DELETE_MOVIE } from "./moviesMutations";

const MoviesTable = () => {
  const [value, setValue] = useState("");
  const { data, fetchMore } = useQuery(GET_MOVIES, { variables: { name: "" } });
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES, variables: { name: "" } }],
  });

  const movies = data?.movies || [];
  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            fetchMore({
              variables: { name: value },
              updateQuery: (previousQueryResult, options) =>
                options.fetchMoreResult,
            });
          }
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
        <div>Name</div>
        <div>Genre</div>
        <div>Rating</div>
        <div>Watched</div>
        <div>Director</div>
        {movies.map((item: any) => {
          return (
            <Fragment key={item.id}>
              <div onClick={() => deleteMovie({ variables: { id: item.id } })}>
                {item.name}
              </div>
              <div>{item.genre}</div>
              <div>{item.rating}</div>
              <div>{item.watched}</div>
              <div>{item?.director?.name}</div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
export default MoviesTable;
