var express = require('express');
var router = express.Router();
var User = require('../model/userSchema');

router.get('/', function (req, res) {
    let userId = req.userId;

    User.findOne({userId: userId}, function (err, user) {
        if (err) console.log(err);
        res.json(user);
    });
});

router.post('/', function (req, res) {
    // TODO validate body
    let userId = req.userId;
    console.log(req.body);

    User.findOneAndUpdate({userId: userId}, req.body, {new: true}, function (err, user) {
        if (err) console.log(err);
        res.json(user);
    });
});


module.exports = router;
