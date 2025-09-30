const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const cors = require('cors');

router.use(cors());

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.findAll();
    res.json(stories);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create story
router.post('/', async (req, res) => {
  try {
    const { eventName, profileImage, posterImage } = req.body;
    const story = await Story.create({
      eventName,
      profileImage: profileImage || null,
      posterImage: posterImage || null,
    });
    res.status(201).json(story);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update story
router.put('/:id', async (req, res) => {
  try {
    const { eventName, profileImage, posterImage } = req.body;
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    await story.update({
      eventName: eventName ?? story.eventName,
      profileImage: profileImage ?? story.profileImage,
      posterImage: posterImage ?? story.posterImage,
    });
    res.json(story);
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete story
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    await story.destroy();
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


