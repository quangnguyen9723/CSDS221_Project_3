import * as React from 'react';
import {TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Header() {
    return (
        <TableRow>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Title</Typography></TableCell>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Description</Typography></TableCell>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Deadline</Typography></TableCell>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Priority</Typography></TableCell>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Is Complete</Typography></TableCell>
            <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>Action</Typography></TableCell>
        </TableRow>
    );
}