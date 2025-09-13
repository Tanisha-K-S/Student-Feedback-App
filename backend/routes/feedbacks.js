const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Submit feedback
router.post('/', auth, async (req, res) => {
  try {
    const { courseId, rating, message } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(400).json({ msg: 'Invalid course' });

    const fb = new Feedback({ student: req.user._id, course: courseId, rating, message });
    await fb.save();
    res.json(fb);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get student's feedbacks (paginated)
router.get('/mine', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Feedback.countDocuments({ student: req.user._id });
    const items = await Feedback.find({ student: req.user._id })
      .populate('course')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ total, page, limit, items });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit feedback (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ msg: 'Not found' });
    if (fb.student.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Forbidden' });

    fb.rating = req.body.rating ?? fb.rating;
    fb.message = req.body.message ?? fb.message;
    await fb.save();
    res.json(fb);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete feedback (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ msg: 'Not found' });
    if (fb.student.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Forbidden' });

    await fb.remove();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
