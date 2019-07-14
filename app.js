let express = require('express');
let cors = require('cors');
let path = require('path');
let app = express();
let logger = require('morgan');
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
let authentication = require('./src/authentication');
let loginRouter = require('./src/endpoints/login');
let registerDeviceRouter = require('./src/endpoints/registerDevice');
let sensorDataRouter = require('./src/endpoints/sensorData');
let sleepQualityRouter = require('./src/endpoints/sleepQuality');
let userDataRouter = require('./src/endpoints/userData');

app.options('*', cors()); // include before other routes
app.use(cors());

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

app.use(logger('dev'));
app.use(express.static('dist'));
app.use(express.json());
app.use(cookieParser());

mongoose.connection.on('connected', function () {
    app.use('/login', loginRouter);
    app.use('/registerDevice', registerDeviceRouter);
    app.use('/sensorData', sensorDataRouter);
    app.use('/sleepQuality', sleepQualityRouter);

    // Protected routes
    app.use(authentication.authentication);
    
    app.use('/userData', userDataRouter);

    app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
    });

    // Start Server
    app.listen(10017, '0.0.0.0', function () {
        console.log(`\nPEM Backend started...\n`);
        console.log(`️⚔️ PEM BACKEND listening on port 10017 ⚔️`)
    });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PEMData', { useNewUrlParser: true })
    .then(() => console.log('Connection to MongoDB succesful'))
    .catch((err) => console.error(err));

var gracefulExit = function () {
    mongoose.connection.close(function () {
        console.log('info', 'server', '> MongoDB disconnected through app termination');
        process.exit(0);
    });
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
