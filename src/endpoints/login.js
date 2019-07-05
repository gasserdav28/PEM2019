const express = require('express');
const router = express.Router();
let path = require('path');
let User = require('../model/userSchema');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../html/login.html'))
});

router.post('/', function (req, res) {
    let userId = req.body.userId;
    console.log(req.body);

    User.find({id: userId}, function (err, user) {
       if (err) console.log(err);
       if (user.length === 0) {
           res.send('UserID not found');
       } else {
           res.send('Logged in');
           // TODO create and send cookie
       }
    });
});

module.exports = router;