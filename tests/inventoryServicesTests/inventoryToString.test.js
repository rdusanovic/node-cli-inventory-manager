const inventoryServices = require('../../services/inventoryServices.js')

test('Reports empty bakery', () => {
    inventoryMap = {}
    expect(inventoryServices.inventoryToString(inventoryMap)).toBe("The bakery is empty\n")
})

test('Correctly shows inventory', () => {
    inventoryMap = {'VS': {3: 699, 5: 899}, 'BM': {4: 1099, 6: 1299}}
    outputString = "VS, options: 3x6.99, 5x8.99\nBM, options: 4x10.99, 6x12.99"
    expect(inventoryServices.inventoryToString(inventoryMap)).toBe(outputString)
})