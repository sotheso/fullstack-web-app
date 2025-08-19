const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const cors = require('cors'); // فعال کردن CORS

// فعال‌سازی CORS برای این روت
router.use(cors());

// Get all events with optional filters
router.get('/', async (req, res) => {
  try {
    const { filterTag, date } = req.query;
    const where = {};
    if (filterTag) where.filterTag = filterTag;
    if (date) where.date = date;  // برای فیلتر کردن بر اساس تاریخ

    const events = await Event.findAll({ where });
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event
router.post('/', async (req, res) => {
  try {
    const { image, eventName, description, date, tags, filterTag, detailsLink } = req.body;
    const event = await Event.create({
      image: image || '/banner.png',
      eventName,
      description,
      date,
      tags: Array.isArray(tags) ? tags : [],
      filterTag: filterTag || 'بازارچه',
      detailsLink: detailsLink || '/details',
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { image, eventName, description, date, tags, filterTag, detailsLink } = req.body;
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({
      image: image ?? event.image,
      eventName: eventName ?? event.eventName,
      description: description ?? event.description,
      date: date ?? event.date,
      tags: Array.isArray(tags) ? tags : event.tags,
      filterTag: filterTag ?? event.filterTag,
      detailsLink: detailsLink ?? event.detailsLink,
    });
    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


