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
    SensorData.find({ userId: userId, sensorId: sensorId }, function (err, data) {
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
            id: '1',
            name: 'Bewegungssensor RCWL-0516',
            data: {
                'detected': 'boolean'
            }
        },
        'Sensor2': {
            id: '2',
            name: 'Geraeuschsensor',
            data: {
                'detected': 'boolean',
                'sound': 'number'
            }
        }, 'Sensor3': {
            id: '3',
            name: 'Temperatur, Luftfeuchtigkeit',
            data: {
                'temperature': 'number(°C)',
                'humidity': 'number(%)'
            }
        }, 'Sensor4': {
            id: '4',
            name: 'eCO2 TVOC SGP30',
            data: {
                'tvoc': 'number(ppm)',
                'eco2': 'number(ppm)'

            }
        },
        'Sensor5': {
            id: '5',
            name: 'Licht',
            data: {
                'light': 'number'
            }
        },
        'Sensor6': {
            id: '6',
            name: 'Button 1',
            data: {
                'pressed': 'boolean'
            }
        },
        'Sensor7': {
            id: '7',
            name: 'Button 2',
            data: {
                'pressed': 'boolean'
            }
        },

    };
    res.send(sensors)
});

module.exports = router;