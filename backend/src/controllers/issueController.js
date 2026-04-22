const Issue = require('../models/Issue');
const Joi = require('joi');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // Finding resource
    query = Issue.find(JSON.parse(queryStr)).populate('user', 'name email').populate('assignees', 'name email');

    // Search by title
    if (req.query.search) {
      query = query.find({ title: { $regex: req.query.search, $options: 'i' } });
    }

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Issue.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const issues = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: issues.length,
      pagination,
      data: issues,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Private
const getIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('user', 'name email').populate('assignees', 'name email');

    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    res.status(200).json({ success: true, data: issue });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().max(100).required(),
      description: Joi.string().max(500).required(),
      status: Joi.string().valid('Open', 'In Progress', 'Resolved'),
      priority: Joi.string().valid('Low', 'Medium', 'High'),
      assignees: Joi.array().items(Joi.string()),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    // Add user to req.body
    req.body.user = req.user.id;

    const issue = await Issue.create(req.body);

    res.status(201).json({ success: true, data: issue });
  } catch (err) {
    next(err);
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = async (req, res, next) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    // Make sure user is issue owner or an assignee
    const isAssignee = issue.assignees && issue.assignees.some(a => a.toString() === req.user.id);
    if (issue.user.toString() !== req.user.id && !isAssignee) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this issue' });
    }

    issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: issue });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    // Make sure user is issue owner
    if (issue.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this issue' });
    }

    await issue.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/issues/stats
// @access  Private
const getIssueStats = async (req, res, next) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format stats to be more user-friendly
    const formattedStats = {
      Open: 0,
      'In Progress': 0,
      Resolved: 0,
    };

    stats.forEach((stat) => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json({ success: true, data: formattedStats });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueStats,
};
