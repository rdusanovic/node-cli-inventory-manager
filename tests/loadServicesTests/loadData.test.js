const loadServices = require('../../services/loadServices.js')

test('Error when file does not exist', () => {
    inventoryMap = {}
    const filename = './fake-file.csv'; 
    errorString = "Unable to read file"
    const res = loadServices.loadData(filename,inventoryMap)
    expect(res).toBe(errorString);
})

test('Successfully load items', () => {
    inventoryMap = {}
    const filename = './example-file-small.csv'
    outputString = "Loaded items successfully"
    const res = loadServices.loadData(filename,inventoryMap)
    expect(res).toBe(outputString)
    expect(inventoryMap).toStrictEqual({
        "VS": {3: 699, 5: 899},
        "BM": {2: 995}
    })
})

test('Invalid Price Specification', () => {
    inventoryMap = {}
    const filename = './invalid-input-price.csv'
    errorString = "Invalid product specification"
    const res = loadServices.loadData(filename,inventoryMap)
    expect(res).toBe(errorString)
    expect(inventoryMap).toStrictEqual({})
})

test('Invalid Count Specification', () => {
    inventoryMap = {}
    const filename = './invalid-input-count.csv'
    errorString = "Invalid product specification"
    const res = loadServices.loadData(filename,inventoryMap)
    expect(res).toBe(errorString)
    expect(inventoryMap).toStrictEqual({})
})

test('Inventory Already Populated', () => {
    inventoryMap = {"VS": {1:1}}
    const filename = './example-file-small.csv'
    errorString = "Inventory already populated"
    const res = loadServices.loadData(filename,inventoryMap)
    expect(res).toBe(errorString)
})
