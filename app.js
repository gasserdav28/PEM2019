var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs')
var app = express();

app.options('*', cors()); // include before other routes
app.use(cors());

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// Use app.get as app.use === middlware (Module erstellen)

app.use(express.static('public'));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});


/*

 ALL ENDPOINTS BELOW NEED TO BE PROTECTED -> VALID COOKIE REQUIRED

 */


// Include Mongoose and add all endpoints (./endpoints/) to app
var mongoose = require('mongoose');
mongoose.connection.on('connected', function () {
    var endpointPath = './src/endpoints/';
    var endpoints = fs.readdirSync(endpointPath);
    endpoints = endpoints.filter(x => x.split('.')[1] === 'js');

    endpoints.forEach(endpoint => {
        console.log('Launching ' + endpoint);
        var route = require(endpointPath + endpoint);
        app.use('/' + endpoint.split('.')[0], route);
    });

    // Start Server
    app.listen(3000, function () {
        // var port = server.address().port;

        console.log(`\nPEM Backend started...\n`);
        console.log(`️⚔️  BACKEND listening on port 3000 ⚔️`)
    });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PEMData', { useNewUrlParser: true })
    .then(() => console.log('Connection to MongoDB succesful'))
    .catch((err) => console.error(err));

var gracefulExit = function () {
    mongoose.connection.close(function () {
        logToConsole('info', 'server', '> MongoDB disconnected through app termination');
        process.exit(0);
    });
};







// add all endpoints 
// add all middleware
// do mongo connection
// do Enque (Bull) to mongo (how does this work??)



var gracefulExit = function () {
    console.log('> Server closed through app termination');
    process.exit(0);

};

//process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);