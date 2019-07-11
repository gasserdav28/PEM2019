var express = require('express');
var router = express.Router();
var User = require('../model/userSchema');

router.get('/', function (req, res) {
    let userId = req.query.userId;

    User.find({userId: userId}, function (err, user) {
        if (err) console.log(err);
        res.json(user);
    });
});

router.post('/', function (req, res) {
    // TODO validate body
    let userId = req.body.userId;
    console.log(userId);

    User.findOneAndUpdate({userId: userId}, req.body, {new: true}, function (err, user) {
        if (err) console.log(err);
        res.json(user);
    });
});


module.exports = router;