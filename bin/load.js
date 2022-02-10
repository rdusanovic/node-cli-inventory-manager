#!/usr/bin/env node

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
 });