const loadServices = require('../../services/loadServices.js')

test('Error when file does not exist', () => {
    inventoryMap = {}
    filename = './fake-file.csv'; 
    error = ["Unable to read file",400]
    res = loadServices.loadData(filename,inventoryMap)
    expect(res).toStrictEqual(error);
})

test('Successfully load items', () => {
    inventoryMap = {}
    filename = './example-file-small.csv'
    output = ["Loaded items successfully", 200]
    res = loadServices.loadData(filename,inventoryMap)
    expect(res).toStrictEqual(output)
    expect(inventoryMap).toStrictEqual({
        "VS": {3: 699, 5: 899},
        "BM": {2: 995}
    })
})

test('Invalid Price Specification', () => {
    inventoryMap = {}
    filename = './invalid-input-price.csv'
    error = ["Invalid product specification", 400]
    res = loadServices.loadData(filename,inventoryMap)
    expect(res).toStrictEqual(error)
    expect(inventoryMap).toStrictEqual({})
})

test('Invalid Count Specification', () => {
    inventoryMap = {}
    filename = './invalid-input-count.csv'
    error = ["Invalid product specification", 400]
    res = loadServices.loadData(filename,inventoryMap)
    expect(res).toStrictEqual(error)
    expect(inventoryMap).toStrictEqual({})
})

test('Inventory Already Populated', () => {
    inventoryMap = {"VS": {1:1}}
    filename = './example-file-small.csv'
    error = ["Inventory already populated", 200]
    res = loadServices.loadData(filename,inventoryMap)
    expect(res).toStrictEqual(error)
})
