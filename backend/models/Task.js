// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' }, // Add status field
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
