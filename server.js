require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const editorsRouter = require('./routes/editors'); // Import editors route

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Register user routes
app.use('/api/users', usersRouter);
app.use('/api/editors', editorsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
