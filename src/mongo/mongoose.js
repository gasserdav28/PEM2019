const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PEMData', { useNewUrlParser: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));


var gracefulExit = function () {
    mongoose.connection.close(function () {
        console.log('> MongoDB disconnected through app termination');
        process.exit(0);
    });
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

