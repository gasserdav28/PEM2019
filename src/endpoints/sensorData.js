const express = require('express');
const router = express.Router();
var SensorData = require('../model/sensorData');

router.get('/', function (req, res) {
    let dataType = req.query.dataType;
    let from = req.query.from;
    let to = req.query.to;

    // query database
    // send response data
    res.send(" - " + dataType + from + to)
});

// Saves an array of sensor data as single entries to the database
router.post('/', function (req, res) {
    console.log(req.body);
    SensorData.create(req.body, function (err) {
        if (err) return console.error(err);
        res.json({ success: true });
    });
});

module.exports = router;