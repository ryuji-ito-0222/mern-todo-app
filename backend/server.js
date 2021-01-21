import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoData from './todoData.js';
import Pusher from 'pusher';
import { mongoURI } from './mongoUri.js';

// app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
"your pusher config"
});

//  middleware
app.use(express.json());
app.use(cors());

// DB config

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB connected');
  const changeStream = mongoose.connection.collection('todolists').watch();
  changeStream.on('change', change => {
    if (
      change.operationType === 'insert' ||
      change.operationType === 'delete'
    ) {
      pusher.trigger('todos', 'newTodo', {
        change: change,
      });
    } else {
      console.log('error');
    }
  });
});

//api routes
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.post('/new/todo', (req, res) => {
  const dbData = req.body;
  console.log(dbData);
  todoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/get/todoList', (req, res) => {
  todoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let todos = [];
      data.map(todoData => {
        const todoInfo = {
          id: todoData._id,
          todo: todoData.todo,
        };
        todos.push(todoInfo);
      });
      res.status(200).send(todos);
    }
  });
});

app.delete('/delete/todo', (req, res) => {
  const id = req.query.id;
  todoData.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
