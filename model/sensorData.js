
const mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    user_id: Number,
    created: { type: Date, default: Date.now },
    data: Schema.Types.Mixed,
})

sensorSchema.statics.safeSensorData = function safeSensorData(){}


module.exports = {
    Sensor: mongoose.model('Sensor', sensorSchema),
};
