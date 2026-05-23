const express = require('express');
const { getDashboardStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/dashboard', getDashboardStats);

module.exports = router;
