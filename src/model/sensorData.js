const mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        minlength: [7, `Corrupted user id - the user id should have exactly 7 digits.`],
        maxlength: [7, `Corrupted user id - the user id should have exactly 7 digits.`],
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    sensorId: {
        type: String,
        required: true,
    },
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('SensorData', sensorSchema, 'sensordata');
