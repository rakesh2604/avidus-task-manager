const express = require('express');
const { getLogs } = require('../controllers/logController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/', getLogs);

module.exports = router;
