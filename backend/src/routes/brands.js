const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get brand by ID
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Get brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new brand
router.post('/', async (req, res) => {
  try {
    const { description, brandName, brandField, avatarSrc } = req.body;
    const brand = await Brand.create({
      description,
      brandName,
      brandField,
      avatarSrc: avatarSrc || '/iconProfile.svg'
    });
    res.status(201).json(brand);
  } catch (error) {
    console.error('Create brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update brand
router.put('/:id', async (req, res) => {
  try {
    const { description, brandName, brandField, avatarSrc } = req.body;
    const brand = await Brand.findByPk(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await brand.update({
      description,
      brandName,
      brandField,
      avatarSrc: avatarSrc || brand.avatarSrc
    });

    res.json(brand);
  } catch (error) {
    console.error('Update brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete brand
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await brand.destroy();
    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Delete brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
