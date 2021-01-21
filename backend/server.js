import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoData from './todoData.js';

// app config
const app = express();
const port = process.env.PORT || 8080;

//  middleware
app.use(express.json());
app.use(cors());

// DB config
const mongoURI =
  'mongodb+srv://admin:1PIURADFkjDj6py8@cluster0.zsai0.mongodb.net/todoDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB connected');
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
