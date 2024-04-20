const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// CREATE (POST)
router.post('/createUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (GET)
router.get('/getAllUser/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE (GET)
router.get('/getUserByID/:id', getUser, (req, res) => {
  res.json(res.user);
});

// UPDATE (PUT)
router.put('/updateUserByID/:id', getUser, async (req, res) => {
  try {
    const { userID, userEmail, userName, userHashedPassword } = req.body;
    if (userID) res.user.userID = userID;
    if (userEmail) res.user.userEmail = userEmail;
    if (userName) res.user.userName = userName;
    if (userHashedPassword) res.user.userHashedPassword = userHashedPassword;
    await res.user.save();
    res.json(res.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (DELETE)
router.delete('/deleteUserByID/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
