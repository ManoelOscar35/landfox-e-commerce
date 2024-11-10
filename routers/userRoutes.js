const User = require('../models/users');
const express = requires('express');
const router = express.Router();

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