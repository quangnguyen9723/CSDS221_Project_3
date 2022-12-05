import Banner from "./components/Banner";
import Header from "./components/Header";
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableContainer,
    TableHead,
} from "@mui/material";
import {useEffect, useState} from "react";
import Todo from "./components/Todo";
import TodoDialog from "./components/TodoDialog";
import {fetchTodos} from "./api";
import UserDialog from "./components/UserDialog";

const initialFormState = {
    title: "",
    description: "",
    deadline: new Date(),
    priority: "low",
    isComplete: false,
};

function App() {
    const [username, setUsername] = useState("");
    const [form, setForm] = useState(initialFormState);
    const [todos, setTodos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [openAuth, setOpenAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        fetchTodos().then(data => setTodos(data.filter(todo => todo.username === username))).catch(e => console.log(e));
    }

    return (
        <Card sx={{m: 2}}>
            <UserDialog
                username={username}
                setUsername={setUsername}
                openAuth={openAuth}
                setOpenAuth={setOpenAuth}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
            />
            <TodoDialog
                username={username}
                form={form}
                setForm={setForm}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                todos={todos}
                setTodos={setTodos}
                isAdd={isAdd}
            />
            <Banner
                username={username}
                setUsername={setUsername}
                setOpenDialog={setOpenDialog}
                setIsAdd={setIsAdd}
                setOpenAuth={setOpenAuth}
                setIsLogin={setIsLogin}/>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <Header/>
                        </TableHead>
                        <TableBody>
                            {todos.map((todo) => (
                                <Todo
                                    key={todo._id}
                                    setForm={setForm}
                                    id={todo._id}
                                    title={todo.title}
                                    description={todo.description}
                                    deadline={todo.deadline}
                                    priority={todo.priority}
                                    isComplete={todo.isComplete}
                                    todos={todos}
                                    setTodos={setTodos}
                                    setIsAdd={setIsAdd}
                                    setOpenDialog={setOpenDialog}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default App;
