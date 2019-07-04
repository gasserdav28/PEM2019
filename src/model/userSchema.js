var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    id: String,
    gender: String
});

module.exports = mongoose.model('User', UserSchema, 'users');