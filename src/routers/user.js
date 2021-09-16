// Author: Colin Francis
// Description: User endpoints

// Imports:
const express = require('express');
const User = require('../models/user.js');

// Initialize new router:
const router = new express.Router();

// Endpoint - Create user account:
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(error) {
        res.status(500).send(error);
    }
});

// Endpoint - Login user:
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.verifyUser(req.body.email, req.body.password);
        res.send(user);
    } catch(error) {
        res.status(400).send();
    }
})

// Exports:
module.exports = router;