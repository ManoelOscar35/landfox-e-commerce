const User = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const users = await User.find().select("-passwordHash");

    if(!users) {
        res.status(400).send("No users found");
    }

    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");

    
    if(!user) {
        res.status(400).send("No user found");
    }

    res.send(user);
});

router.post('/', async (req, res) => {
    let user = new User({
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password),
        isAdmin: req.body.isAdmin
    });

    user = await user.save();

    if(!user) {
        return res.status().send("User cannot be created!");
    }

    res.send(user);
});

module.exports = router;