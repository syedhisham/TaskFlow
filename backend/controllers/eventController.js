
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, start, end } = req.body;

    const event = new Event({
      title,
      start,
      end,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
