var express = require('express');
var bodyParser = require('body-parser');
var inventoryServices = require('../services/inventoryServices.js')
var loadServices = require('../services/loadServices.js')
var orderServices = require('../services/orderServices.js')

var app = express();
app.use(bodyParser.json());

const inventoryMap = {};

var server = app.listen(3000)


app.get('/inventory', function(req,res) {
    var inventoryString = inventoryServices.inventoryToString(inventoryMap)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(inventoryString);
})

app.post('/load', function(req,res) {
    file = req.body.file;
    loadServices.loadData(file,inventoryMap)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end("Loaded items successfully")
})

app.post('/order', function(req,res) {
    var orderString = orderServices.computeOrder(req.body.order,inventoryMap)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(orderString);
})

app.post('/argtest', function(req,res) {
    console.log("Hello")
    console.log(req.body.data)
    console.log(typeof req.body.data)
    // var j = JSON.parse(req.body.data)
    // console.log(JSON.parse(req.body.data))
    // console.log(j.test)
    res.end()
})

