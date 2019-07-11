const mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    userId: String,
    timestamp: { type: Date, default: Date.now },
    sensorId: String,
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('SensorData', sensorSchema, 'sensordata');
