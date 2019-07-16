const express = require('express');
const router = express.Router();
var SensorData = require('../model/sensorData');
let authentication = require('../authentication');
const moment = require('moment')

router.get('/', authentication.authentication, function (req, res) {
    let sensorId = req.query.sensorId;
    let from = req.query.from;
    let to = req.query.to;
    let userId = req.userId;
    console.log(userId);

    if (sensorId === undefined) {
        return res.status(400).send({ code: 1, msg: 'Missing query parameter: sensorId' })
    }

    if (userId === undefined) {
        return res.status(400).send({ code: 1, msg: 'Missing query parameter: userId' })
    }

    // TODO: add from and to
    SensorData.find({ userId: userId, sensorId: sensorId }, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(400).send({ code: 2, msg: err });
        }
        return res.json(data);
    });
});

router.get('/lineSeries', authentication.authentication, function (req, res) {
    let sensorId = req.query.sensorId;
    let from = req.query.from;
    let to = req.query.to;
    let userId = req.query.userId;

    if (sensorId === undefined) {
        return res.status(400).send({ code: 1, msg: 'Missing query parameter: sensorId' })
    }

    if (userId === undefined) {
        return res.status(400).send({ code: 1, msg: 'Missing query parameter: userId' })
    }

    console.log(sensorId)
    console.log(userId)

    // TODO: add from and to
    SensorData.find({ userId: userId, sensorId: sensorId }, function (err, mongoData) {
        if (err) {
            console.error(err);
            return res.status(400).send({ code: 2, msg: err });
        }
        let keys = [];
        if (mongoData[0]) {
            keys = Object.keys(mongoData[0].data)
        } else {
            console.log('No data found');
        }
        let series = []
        keys.forEach(k => {
            let data = []
            mongoData.forEach(e => {
                let time = moment(e.timestamp).format()
                data.push({ x: time, y: e.data[k] })
            })
            series.push({
                name: k,
                data: data
            })
        })
        return res.json(
            { series: series }
        );
    });
});


// Saves an array of sensor data as single entries to the database
router.post('/', function (req, res) {

    // Parses timestamp to UTC (array)
    // req.body.forEach(element => {
    //     let time = parseInt(element.timestamp)
    //     element.timestamp = moment(time).format()
    // });

    // Parses timestamp to UTC (single Obj)
    let time = parseInt(req.body.timestamp)
    req.body.timestamp = moment(time).format()

    // Validate UserId


    console.log(`POST body: ${JSON.stringify(req.body)}s`)
    SensorData.create(req.body, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).send({ code: 3, msg: err });
        }
        return res.json({ success: true });
    });
});

router.get('/sensorIds', function (req, res) {
    var sensors = [ {
            id: '1',
            name: 'Bewegungssensor RCWL-0516',
            data: {
                'detected': 'boolean'
            }
        },
         {
            id: '2',
            name: 'Geraeuschsensor',
            data: {
                'detected': 'boolean',
                'sound': 'number'
            }
        },  {
            id: '3',
            name: 'Temperatur, Luftfeuchtigkeit',
            data: {
                'temperature': 'number(°C)',
                'humidity': 'number(%)'
            }
        },  {
            id: '4',
            name: 'eCO2 TVOC SGP30',
            data: {
                'tvoc': 'number(ppm)',
                'eco2': 'number(ppm)'

            }
        },
        {
            id: '5',
            name: 'Licht',
            data: {
                'light': 'number'
            }
        },
        {
            id: '6',
            name: 'Button 1',
            data: {
                'pressed': 'boolean'
            }
        },
         {
            id: '7',
            name: 'Button 2',
            data: {
                'pressed': 'boolean'
            }
        }];

    res.send(sensors)
});

module.exports = router;
