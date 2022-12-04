import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
    Box,
    DialogActions,
    DialogContent,
    FormControl, FormControlLabel,
    FormLabel, Radio, RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {useState} from "react";
import toastr from "toastr";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditIcon from '@mui/icons-material/Edit';
import {createTodo} from "../api";

const initialFormState = {
    title: "",
    description: "",
    deadline: new Date(),
    priority: "low",
    isComplete: false
};

export default function TodoDialog({form, setForm, openDialog, setOpenDialog, todos, setTodos, isAdd}) {
    const [textTitle, setTextTitle] = useState("");
    const [validTitle, setValidTitle] = useState(true);
    const [textDescription, setTextDescription] = useState("");
    const [validDescription, setValidDescription] = useState(true);

    async function add() {
        if (isValidForm()) {
            const {data} = await createTodo(form);
            setTodos([...todos, data]);
            toastr.success(`Task added successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            cancel();
        }
    }

    function update() {
        if (isValidDescription()) {
            const newTodos = JSON.parse(JSON.stringify(todos));
            const index = newTodos.findIndex(todo => todo.title === form.title);
            newTodos[index] = {form};
            setTodos([...newTodos]);
            toastr.success(`Task updated successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            cancel();
        }
    }

    function cancel() {
        setForm(initialFormState);
        setValidTitle(true);
        setValidDescription(true);
        setTextTitle("");
        setTextDescription("");
        setOpenDialog(false);
    }

    function isValidForm() {
        const validTitle = isValidTitle();
        const validDescription = isValidDescription();

        return validTitle && validDescription;
    }

    function isValidTitle() {
        // check empty
        if (form.title === "") {
            setValidTitle(false);
            setTextTitle("Title is required!");
            toastr.error(`Title is empty!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            return false;
        }
        // check duplicate
        if (todos.filter(todo => todo.title === form.title).length > 0) {
            setValidTitle(false);
            setTextTitle("Title already exists!");
            toastr.error(`Title must be unique!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            return false;
        }

        setValidTitle(true);
        setTextTitle("");
        return true;
    }

    function isValidDescription() {
        // check empty
        if (form.description === "") {
            setValidDescription(false);
            setTextDescription("Description is required!");
            toastr.error(`Description is empty!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            return false;
        }

        setValidDescription(true);
        setTextDescription("");
        return true;
    }

    return (
        <Dialog open={openDialog}>
            {/*header*/}
            <DialogTitle sx={{bgcolor: 'primary.dark', color: 'white'}}>
                {isAdd ? <AddCircleIcon /> : <EditIcon fontSize="small"/>}{" "}
                {isAdd ? "Add" : "Edit"}{" "}
                Task
            </DialogTitle>
            {/*content*/}
            <DialogContent>
                {/*title*/}
                {isAdd
                    && <TextField
                        fullWidth={true}
                        sx={{marginY: 2}}
                        error={!validTitle}
                        id="title"
                        label="Title"
                        helperText={textTitle}
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />}

                {/*description*/}
                <TextField
                    fullWidth={true}
                    sx={{marginY: 2}}
                    error={!validDescription}
                    id="description"
                    label="Description"
                    helperText={textDescription}
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                />
                {/*deadline*/}
                <Box sx={{marginY: 2}}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Deadline"
                                value={form.deadline}
                                onChange={e => setForm({...form, deadline: e})}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Box>
                {/*priority*/}
                <FormControl sx={{marginY: 2}}>
                    <FormLabel id="priority-radio-group">Priority</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="priority"
                        name="priority"
                        value={form.priority}
                        onChange={e => setForm({...form, priority: e.target.value})}
                    >
                        <FormControlLabel value="low" control={<Radio/>} label="Low"/>
                        <FormControlLabel value="med" control={<Radio/>} label="Med"/>
                        <FormControlLabel value="high" control={<Radio/>} label="High"/>
                    </RadioGroup>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={isAdd ? add : update} variant="contained">
                    {isAdd ? <AddCircleIcon fontSize="small"/> : <EditIcon fontSize="small"/>}
                    {isAdd ? "ADD" : "EDIT"}
                </Button>
                <Button onClick={cancel} variant="contained" color="error">
                    <DoDisturbIcon fontSize="small"/>
                    CANCEL
                </Button>
            </DialogActions>
        </Dialog>
    );
}