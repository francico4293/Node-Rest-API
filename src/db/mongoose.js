// Author: Colin Francis
// Description: Establishes database connection

// Imports:
const mongoose = require('mongoose');

// Establish database connection:
mongoose.connect('mongodb://127.0.0.1:27017/rest-api-data');