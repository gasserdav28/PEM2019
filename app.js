
var express = require('express')
var cors = require('cors')
var path = require('path')

var app = express()

app.options('*', cors()) // include before other routes 
app.use(cors())

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

// Use app.get as app.use === middlware (Module erstellen)


app.use(express.static('public'))

// viewed at http://localhost:3000
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'))
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log(`\nPEM Backend started...\n`)
    console.log(`️⚔️  BACKEND listening on port ${port} ⚔️`)

})


process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);