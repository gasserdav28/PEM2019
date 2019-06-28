const express = require('express');
const router = express.Router();


app.get('/sensorData', function (req, res) {
    let dataType = req.query.dataType;
    let from = req.query.from;
    let to = req.query.to;

    // query database
    // send response data
    res.send(" - " + dataType + from + to);
});

app.post('/sensorData', function (req, res) {
    // transform
    // save to database
    res.send(req.body);
});

module.exports = router;