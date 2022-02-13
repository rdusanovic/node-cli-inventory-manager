#!/usr/bin/env node

// Command line script to calculate the package structure of an order
// Sends a POST request to the '/order' endpoint, specifying the order required
// Prints the result to console
// Run 'order --help' for usage help

const yargs = require("yargs");
const axios = require("axios");

const url = "http://localhost:3000/order";

const options = yargs
  .usage("Usage: -o <JSON-order>")
  .option("o", { 
    alias: "order", 
    describe: "Bakery order. Takes a JSON string in the form \"{\\\"<code>\\\": count,...}\" where quotes around codes must be escaped\n E.g \"{\\\"VS\\\":10}\"", 
    type: "string", 
    demandOption: true})
  .coerce("o", function (arg) {
    return JSON.parse(arg)})  
  .argv;  

axios.post(url, 
    { order: options.order }, 
    { headers: { Accept: "text/plain" },
})
 .then(res => {
   console.log(res.data);
 })
 .catch(err => {
  console.error(err.response.data)
});
 