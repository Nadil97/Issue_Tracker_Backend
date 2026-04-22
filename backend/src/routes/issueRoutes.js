const express = require('express');
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueStats,
} = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getIssues).post(createIssue);
router.route('/stats').get(getIssueStats);
router.route('/:id').get(getIssue).put(updateIssue).delete(deleteIssue);

module.exports = router;
