const express = require('express');
const router = express.Router();
var SensorData = require('../model/sensorData');
let authentication = require('../authentication');

router.get('/', authentication.authentication, function (req, res) {
    let sensorId = req.query.sensorId;
    let from = req.query.from;
    let to = req.query.to;
    let userId = req.userId;
    console.log(userId);

    // add from and to
    SensorData.find({userId: userId, sensorId: sensorId}, function (err, data) {
        if (err) console.log(err);
        res.json(data);
    });
});

// Saves an array of sensor data as single entries to the database
router.post('/', function (req, res) {
    SensorData.create(req.body, function (err) {
        if (err) return console.error(err);
        res.json({ success: true });
    });
});

router.get('/sensorIds', function (req, res) {
    var sensors = {
        'Sensor1': {
            id: 1,
            data: {
                'gas': 'number',
            }
        },
        'Sensor2': {
            id: 2,
            data: {
                'gas': 'number',
            }
        }, 'Sensor3': {
            id: 3,
            data: {
                'gas': 'number',
            }
        }, 'Sensor4': {
            id: 4,
            data: {
                'gas': 'number',
            }
        },

    };
    res.send(sensors)
});

module.exports = router;