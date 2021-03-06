// Author: Colin Francis
// Description: Main file for rest API

// Imports:
require('./db/mongoose.js');
const express = require('express');
const userRouter = require('./routers/user.js');

// Initialize express and set port to listen on:
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware:
app.use(express.json());
app.use(userRouter);

// Set server to listen on PORT:
app.listen(PORT, () => console.log(`[+] Server up and listening on port ${PORT}`));