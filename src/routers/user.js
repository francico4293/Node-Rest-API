// Author: Colin Francis
// Description: User endpoints

// Imports:
const express = require('express');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');

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
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(error) {
        res.status(400).send();
    }
});

// Endpoint - Logout user:
router.post('/users/logout', auth, async (req, res) => {
    const tokens = req.user.tokens.filter(token => {
        return token.token !== req.token
    });
    req.user.tokens = tokens;
    await req.user.save();
    res.send(req.user);
});

// Endpoint - Logout all:
router.post('/users/logoutall', auth, async (req, res) => {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user);
});

// Endpoint - Get user profile:
router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user);
});

// Endpoint - Update user profile:
router.patch('/users/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ['name', 'email', 'password'];
    const isValid = updates.every(update => {
        return validUpdates.includes(update)
    });

    if (!isValid) {
        res.status(401).send({error: 'Invalid update'});
    }

    updates.forEach(update => {
        req.user[update] = req.body[update]
    });
    await req.user.save();

    res.send(req.user);
});

// Exports:
module.exports = router;