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
import { useState } from "react";
import Todo from "./components/Todo";
import TodoDialog from "./components/TodoDialog";

const initialFormState = {
  title: "",
  description: "",
  deadline: new Date(),
  priority: "low",
  isComplete: false,
};

function App() {
  const [form, setForm] = useState(initialFormState);
  const [todos, setTodos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  return (
    <Card sx={{ m: 2 }}>
      <TodoDialog
        form={form}
        setForm={setForm}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        todos={todos}
        setTodos={setTodos}
        isAdd={isAdd}
      />
      <Banner setOpenDialog={setOpenDialog} setIsAdd={setIsAdd} />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <Header />
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <Todo
                  setForm={setForm}
                  key={todo.title}
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
