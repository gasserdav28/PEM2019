var express = require('express');
var cors = require('cors');
var path = require('path');
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

app.post('/login', function (req, res) {
    let userID = req.query.userID;
    // check if userID in database
    // send cookie
    res.send('logged in');
});

app.get('/registerDevice', function (req, res) {
    // create random number
    // write to database
});


/*

 ALL ENDPOINTS BELOW NEED TO BE PROTECTED -> VALID COOKIE REQUIRED

 */
app.get('/sensorData', function (req, res) {
    let dataType = req.query.dataType;
    let from = req.query.from;
    let to = req.query.to;

    // query database
    // send response data
    res.send(" - " + dataType + from + to);
});

app.post('/sensorData', function (req, res) {
    // transform
    // save to database
    res.send(req.body);
});


app.post('/sleepQuality', function (req, res) {
    let value = req.query.value;
    let userID = req.query.userID;
    // save to database

    res.send("value :" + value + "userID: " + userID)
});

app.get('/userData', function (req, res) {
    let userID = req.query.userID;
    // query database
    // send query result
    res.send("userID: " + userID);
});

app.post('/userData', function (req, res) {
    // update values in database
    res.send("body: " + req.body);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`\nPEM Backend started...\n`);
    console.log(`️⚔️  BACKEND listening on port ${port} ⚔️`)
});

// add all endpoints 
// add all middleware
// do mongo connection
// do Enque (Bull) to mongo (how does this work??)



var gracefulExit = function () {
    console.log('> Server closed through app termination');
    process.exit(0);

};

//process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);