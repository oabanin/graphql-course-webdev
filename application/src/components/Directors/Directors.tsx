import {useQuery} from "@apollo/client";
import {GET_DIRECTORS} from "./moviesQuery";
import {Fragment} from "react";
import {CircularProgress} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Directors = () => {
    const {data} = useQuery(GET_DIRECTORS);
    const directors = data?.directors || [];

    if (!data) return <CircularProgress/>
    return (
        <>
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
            </div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Movie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {directors.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                                <TableCell
                                    align="right">{row?.movies?.map(({name}: { name: string }) => name).join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Directors