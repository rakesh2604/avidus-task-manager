const express = require('express');
const { body } = require('express-validator');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.get('/:id', getTaskById);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ],
  createTask
);

router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
