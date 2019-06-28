const express = require('express');
const router = express.Router();

router.get('/userData', function (req, res) {
    let userID = req.query.userID;
    // query database
    // send query result
    res.send("userID: " + userID);
});

router.post('/userData', function (req, res) {
    // update values in database
    res.send("body: " + req.body);
});


module.exports = router;