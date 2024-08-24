const express = require('express');
const { createTask, getTasks, updateTaskStatus, updateTask, getCompletedTasks, getTaskById, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/completed', getCompletedTasks); 
router.get('/tasks/:id', getTaskById); 
router.patch('/tasks/:id', updateTaskStatus); 
router.put('/tasks/:id', updateTask); 
router.delete('/tasks/:id', deleteTask); // Add this line

module.exports = router;
