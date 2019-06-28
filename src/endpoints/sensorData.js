const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


// versuche das mal in ein eigenes file zu stecken

var sensorSchema = new mongoose.Schema({
    user_id: Number,
    created: { type: Date, default: Date.now },
    data: Object,
})



router.get('/sensorData', function (req, res) {
    let dataType = req.query.dataType
    let from = req.query.from
    let to = req.query.to

    // query database
    // send response data
    res.send(" - " + dataType + from + to)
})


// speichert gerade nur 1 objekt. kann man aber erweitern. dann nehmen wir einfach saveMany und lassen immer einen array schicken?
router.post('/sensorData', function (req, res) {

    var dataModel = mongoose.model('Sensor', sensorSchema, 'sensordata')

    //sollte als array kommen!
    var newData = req.body.data
    // a document instance
    var data = []
    data.push(new dataModel({ user_id: 123, data: null }))

    // save model to database
    dataModel.insertMany(data, function (err, data) {
        if (err) return console.error(err)
        console.log('Data for user: ' + data[0].user_id + " saved to database.")
    })
    // transform
    // save to database
    res.json({ sucess: true })
})

module.exports = router