const mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    userId: Number,
    created: { type: Date, default: Date.now },
    data: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('SensorData', sensorSchema, 'sensordata');
