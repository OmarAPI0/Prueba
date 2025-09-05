require("dotenv").config();

// mis dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para usar variables del archivo .env

const app = express();
app.use(cors());
app.use(express.json()); // Para recibir datos en JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB 🚀"))
.catch(err => console.error("Error al conectar MongoDB:", err));

// Mi modelo del To-Do o lista de tareas
const TodoSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    completed: Boolean
});
const Todo = mongoose.model('Todo', TodoSchema);


app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});


// Rutas
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminado correctamente" });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
