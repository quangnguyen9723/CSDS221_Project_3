import DialogTitle from "@mui/material/DialogTitle";
import {
    DialogActions,
    DialogContent, Link,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import toastr from "toastr";
import {createUser, fetchUsers} from "../api";

const initialFormState = {
    username: "",
    password: ""
}

export default function UserDialog({username, setUsername, openAuth, setOpenAuth, isLogin, setIsLogin}) {
    const [form, setForm] = useState(initialFormState);

    const [textUsername, setTextUsername] = useState('');
    const [validUsername, setValidUsername] = useState(true);
    const [textPassword, setTextPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);

    function login() {
        // validate form fields
        if (isValidForm()) {
            // validate username and password existence
            fetchUsers().then(users => {
                if (users.find(user => user.username === form.username && user.password === form.password)) {
                    // user exists
                    setUsername(form.username);
                    toastr.success(`Login successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    cancel();
                } else {
                    // user not exists
                    setValidUsername(false);
                    setTextUsername("Check your Username!");
                    setValidPassword(false);
                    setTextPassword("Check your Password!");
                    toastr.error(`Username or password is not correct!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                }
            }).catch(e => console.log(e));
        }
    }

    function register() {
        // validate
        if (isValidForm()) {
            // process to backend and set username
            fetchUsers().then(async users => {
                if (users.find(user => user.username === form.username)) {
                    // username exists
                    setValidUsername(false);
                    setTextUsername("Username already exists!");
                } else {
                    // OK
                    const {data} = await createUser(form);
                    setUsername(data.username);
                    toastr.success(`Register successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    cancel();
                }
            }).catch(e => console.log(e));
        }
    }

    function validateUsername() {
        // check empty
        if (form.username === "") {
            setValidUsername(false);
            setTextUsername("Username is required!");
            toastr.error(`Username is empty!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            return false;
        }
        return true;
    }

    function validatePassword() {
        // check empty
        if (form.password === "") {
            setValidPassword(false);
            setTextPassword("Password is required!");
            toastr.error(`Password is empty!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            return false;
        }

        setValidPassword(true);
        setTextPassword("");
        return true;
    }

    function isValidForm() {
        const validUsername = validateUsername();
        const validPassword = validatePassword();

        return validUsername && validPassword;
    }


    function cancel() {
        setForm(initialFormState);
        setOpenAuth(false);
        setTextUsername('');
        setTextPassword('');
        setValidUsername(true);
        setValidPassword(true);
    }

    return (
        <Dialog open={openAuth}>
            {/*header*/}
            <DialogTitle sx={{bgcolor: 'primary.dark', color: 'white'}}>
                {isLogin ? 'User Login' : 'User Registration'}
            </DialogTitle>
            {/*content*/}
            <DialogContent>
                {/*username*/}
                <TextField
                    fullWidth={true}
                    sx={{marginY: 2}}
                    error={!validUsername}
                    id="username"
                    label="Username"
                    helperText={textUsername}
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                />

                {/*password*/}
                <TextField
                    fullWidth={true}
                    sx={{marginY: 2}}
                    error={!validPassword}
                    id="password"
                    label="Password"
                    helperText={textPassword}
                    value={form.password}
                    type="password"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
            </DialogContent>
            <DialogActions>
                {/* change between login and registration */}
                <Link
                    onClick={() => setIsLogin(!isLogin)}
                    align='justify'
                    sx={{pr: 3}}>
                    <Typography>
                        {isLogin ? "Don't have an account?" : "Have an account?"}
                    </Typography>
                </Link>
                <Button onClick={isLogin ? login : register} variant="contained" sx={{width:100}}>
                    {isLogin ? "Login" : "Register"}
                </Button>
                <Button onClick={cancel} variant="contained" color="error">
                    CANCEL
                </Button>
            </DialogActions>
        </Dialog>
    )
}