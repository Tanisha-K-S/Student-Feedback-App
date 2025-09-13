const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get courses (public)
router.get('/', async (req, res) => {
  const courses = await Course.find().sort('title');
  res.json(courses);
});

// Admin add course
router.post('/', auth, admin, async (req, res) => {
  const { title, code, description } = req.body;
  try {
    const existing = await Course.findOne({ code });
    if (existing) return res.status(400).json({ msg: 'Course code exists' });
    const course = new Course({ title, code, description });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Edit
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
