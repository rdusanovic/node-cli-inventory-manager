// The controller handles incoming HTTP requests and utilizes services to fulfil the requests.

var express = require('express');
var bodyParser = require('body-parser');
var inventoryServices = require('../services/inventoryServices.js')
var loadServices = require('../services/loadServices.js')
var orderServices = require('../services/orderServices.js')
var app = express();
app.use(bodyParser.json());

// In memory data structure that holds the state of the inventory
const inventoryMap = {};

// Runs the server on port 3000
const server = app.listen(3000)

// Allows user to view the state of the inventory
app.get('/inventory', function(req,res) {
    const inventoryString = inventoryServices.inventoryToString(inventoryMap)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(inventoryString);
})

// Allows users to specify which csv file to load the inventory from
app.post('/load', function(req,res) {
    
    const file = req.body.file
    // Check that the file is a csv, throw HTTP 400 otherwise
    if (file.slice(-3) !== 'csv') {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain')
        res.end("File must be in csv format")
    }

    const loadMessage = loadServices.loadData(file,inventoryMap)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(loadMessage)
})

// Allows users to submit orders from the inventory, returns an order with minimal packaging
app.post('/order', function(req,res) {
    // Sanitize the input?
    const orderString = orderServices.computeOrder(req.body.order,inventoryMap)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(orderString);
})


