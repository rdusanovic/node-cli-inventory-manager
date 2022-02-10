var fs = require('fs');
var parser = require('csv-parse');


function loadData(filename, inventoryMap) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        parser.parse(data, {columns: false, trim: true}, function(err, rows) {
            if (err) {
                console.error(err)
            }
            ingestData(rows,inventoryMap)
        })
    })
}

function ingestData(data, inventoryMap) {
    // Do some stuff
    for (var i = 1; i < data.length; i++) {
        // If code not in map
        var code = data[i][0]
        var count = parseInt(data[i][1])
        var price = parseInt(data[i][2])
        if (!(code in inventoryMap)) {
            inventoryMap[code] = {};
        } 
        //Edge case checking, sanitise input
        inventoryMap[code][count] = price;
    }
} 

module.exports = {
    loadData: loadData
}