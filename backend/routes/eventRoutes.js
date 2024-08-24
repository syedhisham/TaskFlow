// routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

// Route to create a new event
router.post('/events', createEvent);

// Route to get all events
router.get('/events', getEvents);

module.exports = router;
