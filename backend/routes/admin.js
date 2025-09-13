const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const { toCSV } = require('../utils/csvExport');

// Admin only: stats
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    // avg ratings per course
    const agg = await Feedback.aggregate([
      { $group: { _id: '$course', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
      { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
      { $unwind: '$course' },
      { $project: { courseTitle: '$course.title', avgRating: 1, count: 1 } }
    ]);

    res.json({ totalFeedback, totalStudents, courseStats: agg });
  } catch (err) { res.status(500).send('Server error'); }
});

// Admin: list students
router.get('/students', auth, admin, async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json(students);
});

// block/unblock
router.post('/students/:id/block', auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  user.blocked = true;
  await user.save();
  res.json({ msg: 'Blocked' });
});
router.post('/students/:id/unblock', auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  user.blocked = false;
  await user.save();
  res.json({ msg: 'Unblocked' });
});

// Delete user
router.delete('/students/:id', auth, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

// View all feedbacks with filters
router.get('/feedbacks', auth, admin, async (req, res) => {
  const { course, rating, student } = req.query;
  const filter = {};
  if (course) filter.course = course;
  if (rating) filter.rating = Number(rating);
  if (student) filter.student = student;
  const items = await Feedback.find(filter).populate('student', 'name email').populate('course');
  res.json(items);
});

// Export CSV
router.get('/export', auth, admin, async (req, res) => {
  const items = await Feedback.find().populate('student', 'name email').populate('course');
  const rows = items.map(i => ({ studentName: i.student.name, studentEmail: i.student.email, course: i.course.title, rating: i.rating, message: i.message, createdAt: i.createdAt }));
  const csv = toCSV(rows, ['studentName','studentEmail','course','rating','message','createdAt']);
  res.header('Content-Type', 'text/csv');
  res.attachment('feedbacks.csv');
  res.send(csv);
});

module.exports = router;
