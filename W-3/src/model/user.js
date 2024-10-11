const mongoose = require('mongoose');

// Define Mongoose Schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name is required'],
    // minlength: [2, 'Name must be at least 2 characters long'],
  },
  handle: {
    type: String,
    required: [true, 'Social media handle is required'],
    validate: {
      validator: function (v) {
        // URL format validation for social media handle
        return /^(https?:\/\/)?(www\.)?(\w+\.)+\w{2,}$/.test(v);
      },
      message: 'Invalid social media URL',
    },
  },
//   images: {
//     type: String, // Array to store the paths of uploaded images
//     validate: {
//       validator: function (v) {
//         // Ensure at least one image is uploaded
//         return v && v.length > 0;
//       },
//       message: 'At least one image is required',
//     },
//   },
}, { timestamps: true });

// Export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
