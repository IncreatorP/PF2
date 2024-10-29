require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accessLevel: 'user' // Default access
    });

    // Create JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        accessLevel: user.accessLevel
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    // Respond with token and user data
    res.status(201).json({
      token,
      name: user.name,
      accessLevel: user.accessLevel
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
