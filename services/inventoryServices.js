
// Maps the inventory to a string
function inventoryToString(inventoryMap) {
    // Check if inventory is empty
    if (Object.keys(inventoryMap).length == 0) {
        return "The bakery is empty"
    }

    var str = ''

    for (code in inventoryMap) {
        str += code + ', options: '
        for (count in inventoryMap[code]) {
            str += count + 'x' + (inventoryMap[code][count] / 100.0).toString() + ', '
        }
        str = str.slice(0,-2)
        str += '\n'
    }
    str = str.slice(0,-1)
    return str
}
module.exports = {
    inventoryToString: inventoryToString
}