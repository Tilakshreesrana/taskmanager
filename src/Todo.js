import React, { useState, useEffect } from "react";
import * as material from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editInput, setEditInput] = useState("");

  // Load tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditInput(tasks[index].text);
  };

  const saveTask = () => {
    const newTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editInput } : task
    );
    setTasks(newTasks);
    setEditIndex(-1);
    setEditInput("");
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <material.Typography variant="h4" gutterBottom>
        To-Do List
      </material.Typography>
      <material.Card variant="outlined" style={{ marginBottom: "20px" }}>
        <material.CardContent>
          <material.TextField
            fullWidth
            label="Add a task"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <material.Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={addTask}
            fullWidth
          >
            Add Task
          </material.Button>
        </material.CardContent>
      </material.Card>

      <material.List>
        {tasks.map((task, index) => (
          <material.ListItem
            key={index}
            style={{
              backgroundColor: "#f9f9f9",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <material.Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            {editIndex === index ? (
              <material.TextField
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                fullWidth
                variant="standard"
              />
            ) : (
              <material.ListItemText
                primary={task.text}
                style={{
                  textDecoration: task.completed ? "line-through" : "none", // Apply strike-through only to the task text
                }}
              />
            )}
            <material.ListItemSecondaryAction>
              {editIndex === index ? (
                <material.Button
                  variant="outlined"
                  color="secondary"
                  onClick={saveTask}
                  style={{ marginRight: "5px" }}
                >
                  Save
                </material.Button>
              ) : (
                <material.IconButton
                  edge="end"
                  onClick={() => editTask(index)}
                  color="primary"
                >
                  <Edit />
                </material.IconButton>
              )}
              <material.IconButton
                edge="end"
                onClick={() => removeTask(index)}
                color="error"
              >
                <Delete />
              </material.IconButton>
            </material.ListItemSecondaryAction>
          </material.ListItem>
        ))}
      </material.List>
    </div>
  );
}

export default Todo;
