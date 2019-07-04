const express = require('express');
const router = express.Router();
let userSchema = require('../model/userSchema');

router.get('/', function (req, res, next) {
    let userID = req.query.userID;

    userSchema.userList(function (err, users) {
        if (err) { return next(err); }
        res.send("users: " + users);
    });
    // query database
    // send query result
});

router.post('/', function (req, res) {
    // update values in database
    res.send("body: " + req.body);
});


module.exports = router;