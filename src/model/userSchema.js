var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    gender: String,
    age: Number,
    weight: Number,
    height: Number
});

module.exports = mongoose.model('User', UserSchema, 'users');
