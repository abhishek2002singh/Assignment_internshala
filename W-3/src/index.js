const express = require('express');
const bodyParser = require('body-parser');
 const dbConnection = require('./config/database')
const path = require('path');
const userRoutes = require('./router/router');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON data (application/json)
app.use(express.json());

// Middleware to parse URL-encoded data (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the defined routes for user-related requests
app.use('/', userRoutes);

 dbConnection()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
