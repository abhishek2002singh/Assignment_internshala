const express = require('express');
const multer = require('multer');
const User = require('../model/User');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// // Configure Multer for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = './uploads';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// Route to handle user form submission
router.post('/submit', async (req, res) => {
  try {
    const { name, handle } = req.body;
    // const imagePaths = req.files.map(file => file.path);

    // Create new User instance and save to DB
    const newUser = new User({
      name,
      handle,
      // images: imagePaths,
    });

     await newUser.save();
    res.status(201).json({ message: 'User data saved successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: 'An error occurred while saving user data.' });
  }
});

// Route to display the list of all users in the admin dashboard
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
