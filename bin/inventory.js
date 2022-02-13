#!/usr/bin/env node

// Command line script to view current inventory
// Sends a GET request to the '/inventory' endpoint
// Prints the result to console


const axios = require("axios");

const url = "http://localhost:3000/inventory";

axios.get(url, { 
    headers: { Accept: "text/plain" },
})
 .then(res => {
   console.log(res.data);
 });