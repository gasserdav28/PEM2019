const express = require('express');
const cryptoRandomString = require('crypto-random-string');
const router = express.Router();
var User = require('../model/userSchema');

router.get('/', function (req, res) {
    // TODO detect if id already in use
    let userId = cryptoRandomString({length: 7, characters: '1234567890'});

    var newUser = new User({id: userId});

    newUser.save(function (err, user) {
        if (err) return console.error(err);
        res.json({userId: user.id});
    });
});

module.exports = router;