// Author: Colin Francis
// Description: Schema, model, and methods used for users

// Imports:
const mongoose = require('mongoose');
const validator = require('validator');

// Create user schema:
const userSchema = mongoose.Schema({
    name: {

    },
    email: {

    },
    password: {

    },
    tokens: [{
        token: {

        }
    }]
});

// Create user model:
const User = mongoose.model('User', userSchema);

// Exports:
module.exports = User;