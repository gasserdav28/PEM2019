const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    let userID = req.query.userID;
    // check if userID in database
    // send cookie
    res.send('logged in');
});

module.exports = router;