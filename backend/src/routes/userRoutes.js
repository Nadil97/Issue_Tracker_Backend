const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const users = await User.find().select('name email');
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
