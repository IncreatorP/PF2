const express = require('express');
const router = express.Router();
const verifyTokenAndAccessLevel = require('../middleware/authMiddleware');

// Example editor endpoint that requires "editor" or "admin" level access
router.get('/', verifyTokenAndAccessLevel('editor'), (req, res) => {
  res.json({ message: 'Welcome to the editor section!' });
});

module.exports = router;
