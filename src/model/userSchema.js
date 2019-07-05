var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    gender: String
});

module.exports = mongoose.model('User', UserSchema, 'users');