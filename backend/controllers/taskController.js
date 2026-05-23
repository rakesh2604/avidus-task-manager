const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = {};

    if (req.user.role !== 'Admin') {
      filter.userId = req.user._id;
    }
    if (status) filter.status = status;

    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
          limit: Number(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('userId', 'name email');
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'Admin' && !task.userId._id.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const { title, description } = req.body;

    const task = await Task.create({ title, description, userId: req.user._id });

    await ActivityLog.create({
      userId: req.user._id,
      action: 'task_create',
      details: { taskId: task._id, title: task.title },
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'Admin' && !task.userId.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      task.status = status;
      task.completedAt = status === 'Completed' ? new Date() : null;
    }

    await task.save();

    await ActivityLog.create({
      userId: req.user._id,
      action: 'task_update',
      details: { taskId: task._id, changes: req.body },
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'Admin' && !task.userId.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await ActivityLog.create({
      userId: req.user._id,
      action: 'task_delete',
      details: { taskId: task._id, title: task.title },
    });

    await task.deleteOne();

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
