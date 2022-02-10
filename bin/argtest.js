#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const url = "http://localhost:3000/argtest";

const options = yargs
  .usage("Usage: -a <filename>")
  .option("a", { 
    alias: "args", 
    describe: "The filename of the file to load into the inventory", 
    type: "string", 
    demandOption: true})
  .coerce("a", function (arg) {
      return JSON.parse(arg)})  
  .argv;  



axios.post(url, 
    // { data: JSON.parse(options.args) }, 
    { data: options.args }, 
    { headers: { Accept: "application/json" },
})
 .then(res => {
   console.log("ok");
 });