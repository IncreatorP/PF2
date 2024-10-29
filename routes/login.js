const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

// POST: Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If successful, return user info (excluding the password)
    res.status(200).json({
      name: user.name,
      email: user.email,
      accessLevel: user.accessLevel
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
