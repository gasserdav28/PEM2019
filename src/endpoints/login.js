const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../model/userSchema');
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../html/login.html'))
});

router.post('/', function (req, res) {
    let userId = req.body.userId;
    console.log(req.body);

    User.find({id: userId}, function (err, user) {
       if (err) console.log(err);
       if (user.length === 0) {
           res.json({
               success: false,
               message: 'UserID not found'
           });
       } else {
           let privateKey = fs.readFileSync(path.join(__dirname + '/../../private.key'), 'utf-8');

           let token = jwt.sign({userId: userId}, privateKey, { algorithm:  "RS256"});
           res.cookie('token',token);
           res.json({
               success: true,
               message: 'Authentication successful!',
               token: token
           });
       }
    });
});

module.exports = router;