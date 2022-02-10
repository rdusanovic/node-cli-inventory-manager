#!/usr/bin/env node

const axios = require("axios");

const url = "http://localhost:3000/inventory";

axios.get(url, { 
    headers: { Accept: "text/plain" },
})
 .then(res => {
   console.log(res.data);
 });