const express = require('express');
const router = express.Router();

app.get('/userData', function (req, res) {
    let userID = req.query.userID;
    // query database
    // send query result
    res.send("userID: " + userID);
});

app.post('/userData', function (req, res) {
    // update values in database
    res.send("body: " + req.body);
});


module.exports = router;