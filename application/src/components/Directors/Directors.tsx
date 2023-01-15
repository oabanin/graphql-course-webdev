import {useQuery} from "@apollo/client";
import {GET_DIRECTORS} from "./moviesQuery";
import {Fragment} from "react";

const Directors = () => {
    const {data} = useQuery(GET_DIRECTORS);
    const directors = data?.directors || [];
    console.log(directors)
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
            <div><b>Name</b></div>
            <div><b>Age</b></div>
            <div><b>Movie</b></div>
            {directors.map((item: any) => {
                return (
                    <Fragment key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.age}</div>
                        <div>{item.movies.map(({name}: { name: string }) => name).join(', ')}</div>
                    </Fragment>
                )
            })}
        </div>)
}

export default Directors