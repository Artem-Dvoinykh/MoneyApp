// the route path: /auth
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// registration
router.post('/register', async(req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username: username, password: hashedPassword});
    await user.save();
    res.json({ message: 'user has been registered' });
})

// log in
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'username not found' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(400).json({ message: 'incorrect password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    res.json({ token });
})


module.exports = router;