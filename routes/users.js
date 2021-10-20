const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

router.post('/new-user', hashPassword, async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: res.hashedPassword
  })
  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add JWT token
router.post('/login', async (req, res) => {
  try { 
    const user = await User.find({ email: req.body.email });
    if (user === null) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.send("login");
});

async function hashPassword(req, res, next) {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    return res.status(500).send(); 
  }

  res.hashedPassword = hashedPassword;
  next();
}

module.exports = router;
