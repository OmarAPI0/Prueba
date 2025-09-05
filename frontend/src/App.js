import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  // para cargar mis tareas
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  // Agregar o editar tarea
  const handleSubmit = async () => {
    if (!title || !content || !date) return alert("Todos los campos son requeridos");

    if (editId) {
      await axios.put(`http://localhost:5000/todos/${editId}`, {
        title,
        content,
        date,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/todos", {
        title,
        content,
        date,
        completed: false,
      });
    }

    setTitle("");
    setContent("");
    setDate("");
    fetchTodos();
  };

  // Marcar como completada o pendiente mis tareas
  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  // Eliminar tarea
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  // Editar tarea
  const editTodo = (todo) => {
    setTitle(todo.title);
    setContent(todo.content);
    setDate(todo.date.split("T")[0]);
    setEditId(todo._id);
  };

  return (
    <div style={{ margin: "20px", backgroundColor: "#f764", padding: "20px", borderRadius: "8px", marginBottom: "25px" }}>
      <h1>To-Do List by Omar</h1>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>{editId ? "Actualizar" : "Agregar"}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>: {todo.content} <br />
            <em>{new Date(todo.date).toLocaleDateString()}</em> |{" "}
            <span
              style={{
                color: todo.completed ? "green" : "red",
                cursor: "pointer",
              }}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.completed ? "Completada" : "Pendiente"}
            </span>
            <br />
            <button onClick={() => editTodo(todo)}>Editar</button>
            <button onClick={() => deleteTodo(todo._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
