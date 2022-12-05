import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {CardHeader, Grid} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toastr from "toastr";

export default function Banner({username, setUsername, setOpenDialog, setIsAdd, setOpenAuth, setIsLogin}) {

    const login = () => {
        setOpenAuth(true);
        setIsLogin(true);
    }

    const logout = () => {
        setUsername('');
        toastr.success(`Logout successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
    }

    const add = () => {
        if (username) {
            setIsAdd(true);
            setOpenDialog(true);
        } else {
            toastr.error(`Must login to add todo!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        }
    }
    return (
        <CardHeader
            sx={{textAlign: "center", bgcolor: "primary.dark", color: "white"}}
            title={
            <Grid container direction="row" sx={{justifyContent:'space-between'}}>
                <Button
                    variant="contained"
                    onClick={username ? logout : login}
                    sx={{width: 100, marginRight: '7px'}}
                >
                    <Typography>{username ? 'LOGOUT' : 'LOGIN'}</Typography>
                </Button>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: "center"
                    }}>
                    <MenuIcon fontSize="large"/>
                    <span>TODOER</span>
                </Typography>
                <Button
                    variant="contained"
                    onClick={add}
                    sx={{width: 100, marginRight: '7px'}}
                >
                    <AddCircleIcon fontSize="small" sx={{mr:1}}/><Typography>ADD</Typography>
                </Button>
            </Grid>
            }
        />

    );
}
