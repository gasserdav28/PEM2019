var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    id: { type: String, required: true }
});

// Use UserSchema.statics to define static functions
UserSchema.statics.userList = function(cb) {
    this.find().limit( 20 ).exec( function( err, users )
    {
        if( err ) return cb( err );

        cb(null, users);
    });
};

UserSchema.statics.addUser = function(cb) {
    this.find().limit( 20 ).exec( function( err, users )
    {
        if( err ) return cb( err );

        cb(null, users);
    });
};

module.exports = mongoose.model( 'User', UserSchema, 'users' );