const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const cors = require('cors'); // فعال کردن CORS

// فعال‌سازی CORS برای این روت
router.use(cors());

// Get all events with optional filters and optional pagination
router.get('/', async (req, res) => {
  try {
    const { filterTag, date, page, limit } = req.query;
    const where = {};
    if (filterTag) where.filterTag = filterTag;
    if (date) where.date = date; // فیلتر بر اساس تاریخ

    // If pagination params provided, return paginated response
    const hasPagination = typeof page !== 'undefined' || typeof limit !== 'undefined';
    if (hasPagination) {
      const pageNum = Math.max(parseInt(page, 10) || 1, 1);
      const pageSize = Math.min(Math.max(parseInt(limit, 10) || 8, 1), 50);
      const offset = (pageNum - 1) * pageSize;

      const { rows, count } = await Event.findAndCountAll({
        where,
        limit: pageSize,
        offset,
        order: [['createdAt', 'DESC']],
      });

      return res.json({
        items: rows,
        total: count,
        page: pageNum,
        pageSize,
        totalPages: Math.max(Math.ceil(count / pageSize), 1),
      });
    }

    // Legacy behavior: return all events
    const events = await Event.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    return res.status(500).json({ message: 'Server error' });
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
    const { 
      image, eventName, description, date, tags, filterTag, detailsLink,
      images, address, mapUrl, timeDetails, programs, brands, isExpired,
      brand_id, hosts, users, camment
    } = req.body;
    const event = await Event.create({
      image: image || '/banner.png',
      eventName,
      description,
      date,
      tags: Array.isArray(tags) ? tags : [],
      filterTag: filterTag || 'بازارچه',
      detailsLink: detailsLink || '/details',
      images: Array.isArray(images) ? images : [],
      address: address || null,
      mapUrl: mapUrl || null,
      timeDetails: timeDetails || null,
      programs: Array.isArray(programs) ? programs : [],
      brands: Array.isArray(brands) ? brands : [],
      isExpired: isExpired || false,
      brand_id: brand_id || null,
      hosts: hosts || null,
      users: users || null,
      camment: camment || null,
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
    const { 
      image, eventName, description, date, tags, filterTag, detailsLink,
      images, address, mapUrl, timeDetails, programs, brands, isExpired,
      brand_id, hosts, users, camment
    } = req.body;
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
      images: Array.isArray(images) ? images : event.images,
      address: address ?? event.address,
      mapUrl: mapUrl ?? event.mapUrl,
      timeDetails: timeDetails ?? event.timeDetails,
      programs: Array.isArray(programs) ? programs : event.programs,
      brands: Array.isArray(brands) ? brands : event.brands,
      isExpired: isExpired ?? event.isExpired,
      brand_id: brand_id ?? event.brand_id,
      hosts: hosts ?? event.hosts,
      users: users ?? event.users,
      camment: camment ?? event.camment,
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


