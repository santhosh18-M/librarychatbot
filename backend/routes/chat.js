const express = require('express');
const router = express.Router();
const { chatController } = require('../controllers/chatController');

// Define POST route for chat
router.post('/', chatController);

module.exports = router;
