import {useQuery} from "@apollo/client";
import {GET_DIRECTORS} from "./directorsQuery";
import {CircularProgress} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const DirectorsTable = () => {
    const {data, error} = useQuery(GET_DIRECTORS);
    const directors = data?.directors || [];

    if (!data && !error) return <CircularProgress/>
    if(error) return <>{error.message}</>
    return (

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

    )
}

export default DirectorsTable;