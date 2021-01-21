import mongoose from 'mongoose';

const todoScheme = mongoose.Schema({
  todo: String,
  timestamp: String,
});

export default mongoose.model('todoList', todoScheme);
