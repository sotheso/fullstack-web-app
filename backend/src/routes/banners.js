const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const { Op } = require('sequelize');
const cors = require('cors'); // فعال کردن CORS

router.use(cors());

// Get all banners with optional tag filter
router.get('/', async (req, res) => {
  try {
    const { tag } = req.query; // دریافت فیلتر تگ از URL
    const banners = tag ? await Banner.findAll({ where: { tags: { [Op.contains]: [tag] } } }) : await Banner.findAll();
    res.json(banners);
  } catch (error) {
    console.error('Get banners error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get banner by ID
router.get('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    console.error('Get banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create banner
router.post('/', async (req, res) => {
  try {
    const { image, date, tags, eventName, eventDescription, detailsLink } = req.body;
    const banner = await Banner.create({
      image: image || '/banner-image.jpg',
      date,
      tags: Array.isArray(tags) ? tags : [],
      eventName,
      eventDescription,
      detailsLink: detailsLink || '/details',
    });
    res.status(201).json(banner);
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update banner
router.put('/:id', async (req, res) => {
  try {
    const { image, date, tags, eventName, eventDescription, detailsLink } = req.body;
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    await banner.update({
      image: image ?? banner.image,
      date: date ?? banner.date,
      tags: Array.isArray(tags) ? tags : banner.tags,
      eventName: eventName ?? banner.eventName,
      eventDescription: eventDescription ?? banner.eventDescription,
      detailsLink: detailsLink ?? banner.detailsLink,
    });
    res.json(banner);
  } catch (error) {
    console.error('Update banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete banner
router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    await banner.destroy();
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


