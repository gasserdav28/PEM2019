const express = require('express');
const router = express.Router();


router.post('/', function (req, res) {
    let value = req.query.value;
    let userID = req.query.userID;
    // save to database

    res.send("value :" + value + "userID: " + userID)
});

module.exports = router;