require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const editorsRouter = require('./routes/editors'); // Import editors route
const loginRoute = require('./routes/login');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json()); // Make sure JSON body parsing is enabled


// Register user routes
app.use('/api/users', usersRouter);
app.use('/api/editors', editorsRouter);
app.use('/api', loginRoute); // Mount login route at /api

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
