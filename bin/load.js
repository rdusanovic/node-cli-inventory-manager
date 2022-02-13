#!/usr/bin/env node

// Command line script to load the inventory from a csv file
// Sends a POST request to the '/load' endpoint, specifying the file to read in
// Prints the result to console
// Run 'load --help' for usage help

const yargs = require("yargs");
const axios = require("axios");

const url = "http://localhost:3000/load";

const options = yargs
  .usage("Usage: -f <filename>")
  .option("f", { 
    alias: "file", 
    describe: "The filename of the file to load into the inventory", 
    type: "string", 
    demandOption: true})
  .argv;  

axios.post(url, 
    { file: `${options.file}` }, 
    { headers: { Accept: "text/plain" },
})
 .then(res => {
   console.log(res.data);
 })
 .catch(err => {
   console.error(err.response.data)
});