const express = require('express')
const router = express.Router();
const userModel = require('../models/users');
const {validateUser} = require('../middleware/validator');

router.get('/',(req,res) => {
    const users = userModel.getAllUsers(req.query);
    res.json(users);
});

