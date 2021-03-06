const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../model/userSchema');
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res) {
    let userId = req.body.userId;
    console.log(req.body.userId)

    if (!userId) {
        return res.status(403).send({
            error: 'UserID empty'
        });
    }
    else {
        User.find({ userId: userId }, function (err, user) {
            if (err) console.log(err);
            if (user.length === 0) {
                return res.status(403).send({
                    error: 'UserID not found'
                });
            } else {
                let privateKey = fs.readFileSync(path.join(__dirname + '/../../private.key'), 'utf-8');

                let token = jwt.sign({ userId: userId }, privateKey, { algorithm: "RS256", expiresIn: "90d"});
                res.cookie('token', token);
                return res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }
        });
    }
});

module.exports = router;
