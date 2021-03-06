// Author: Colin Francis
// Description: Authorization middleware

// Imports:
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authenticate user:
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'puhvp;ow#@R@;kjnfw');
        const user = await User.findOne({id: decoded.id, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch(error) {
        res.status(401).send({error: 'Please authenticate'});
    }
}

// Exports:
module.exports = auth;