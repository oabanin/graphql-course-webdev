import {gql} from "@apollo/client";
import MoviesTable from "./MoviesTable";

const Movies = () => {

    return (
        <div>
            <div>Movies</div>
            <MoviesTable/>
        </div>
    )
}

export default Movies