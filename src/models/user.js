// Author: Colin Francis
// Description: Schema, model, and methods used for users

// Imports:
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Generate JSON web token for a user:
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({id: this.id.toString()}, 'puhvp;ow#@R@;kjnfw');
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
}

// Verify user credentials:
userSchema.statics.verifyUser = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Invalid login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login');
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();

    delete userObject.tokens;
    delete userObject.password;

    return userObject;
}

// Create user model:
const User = mongoose.model('User', userSchema);

// Exports:
module.exports = User;