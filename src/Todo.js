import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (input.trim()) {
      const response = await axios.post(API_URL, { text: input });
      setTasks([...tasks, response.data]);
      setInput("");
    }
  };

  const updateTask = async (id, updatedTask) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    setTasks(
      tasks.map((task) =>
        task._id === id ? response.data : task
      )
    );
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    updateTask(id, { ...task, completed: !task.completed });
  };

  const saveTask = (id) => {
    updateTask(id, { text: editInput, completed: false });
    setEditIndex(null);
    setEditInput("");
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <Typography variant="h4" gutterBottom>
        To-Do List
      </Typography>
      <Card variant="outlined" style={{ marginBottom: "20px" }}>
        <CardContent>
          <TextField
            fullWidth
            label="Add a task"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={addTask}
            fullWidth
          >
            Add Task
          </Button>
        </CardContent>
      </Card>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              backgroundColor: "#f9f9f9",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(task._id)}
            />
            {editIndex === task._id ? (
              <TextField
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                fullWidth
                variant="standard"
              />
            ) : (
              <ListItemText primary={task.text} />
            )}
            <IconButton
              edge="end"
              onClick={() =>
                editIndex === task._id
                  ? saveTask(task._id)
                  : setEditIndex(task._id) & setEditInput(task.text)
              }
              color="primary"
            >
              <Edit />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => deleteTask(task._id)}
              color="error"
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
