import {useQuery} from "@apollo/client";
import {GET_MOVIES} from "./moviesQuery";
import {Fragment} from "react";

const MoviesTable = () => {
    const {data} = useQuery(GET_MOVIES);
    const movies = data?.movies || [];
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)"}}>
            <div>Name</div>
            <div>Genre</div>
            <div>Rating</div>
            <div>Watched</div>
            <div>Director</div>
            {movies.map((item: any) => {
                return (
                    <Fragment key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.genre}</div>
                        <div>{item.rating}</div>
                        <div>{item.watched}</div>
                        <div>{item.director.name}</div>
                    </Fragment>
                )
            })}
        </div>)
}
export default MoviesTable;