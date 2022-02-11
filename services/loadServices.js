var fs = require('fs');
var parser = require('csv-parse/sync');

function loadData(filename, inventoryMap) {
    if (Object.keys(inventoryMap).length > 0) {
        return "Inventory already populated"
    }
    try {
        var data = fs.readFileSync(filename, 'utf8')
    } catch (error) {
        return "Unable to read file"
    }
    var parsedData = parser.parse(data,{columns: false, trim: true})
    if (ingestData(parsedData,inventoryMap)) {
        return "Loaded items successfully"
    } else {
        return "Invalid product specification"
    }
}

function ingestData(data, inventoryMap) {
    for (var i = 1; i < data.length; i++) {
        var code = data[i][0]
        var count = parseInt(data[i][1])
        var price = parseInt(data[i][2])

        // Constrain count to be strictly positive
        if (count <= 0) {
            inventoryMap = {}
            return false
        }

        // Constrain price to be strictly positive
        if (price <= 0) {
            inventoryMap = {}
            return false
        }

        // If code not in map
        if (!(code in inventoryMap)) {
            inventoryMap[code] = {};
        } 
        inventoryMap[code][count] = price;
    }
    return true
} 

module.exports = {
    loadData: loadData
}