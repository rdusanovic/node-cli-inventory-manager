#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const url = "http://localhost:3000/order";

const options = yargs
  .usage("Usage: -o <JSON-order>")
  .option("o", { 
    alias: "order", 
    describe: "The filename of the file to load into the inventory", 
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
 });