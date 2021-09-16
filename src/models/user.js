// Author: Colin Francis
// Description: Schema, model, and methods used for users

// Imports:
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Create user schema:
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Your password must not contain "password"');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Hash passwords:
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
})

// Create user model:
const User = mongoose.model('User', userSchema);

// Exports:
module.exports = User;