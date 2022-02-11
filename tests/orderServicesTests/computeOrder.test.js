const orderServices = require('../../services/OrderServices.js')

test('Correct order string is returned', () => {
    inventoryMap = {
        "VS": { 2: 100, 5: 100, 7: 100},
        "BM": { 1: 100, 2: 100, 5: 100}
    }
    orderData = {"VS": 12, "BM": 5}
    orderString = "VS, $2, packages: 1x5, 1x7\nBM, $1, packages: 1x5"
    const res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toBe(orderString);
})

test('Invalid order code', () => {
    inventoryMap = {
        "VS": { 2: 100, 5: 100, 7: 100},
    }
    orderData = {"BM": 2}
    errorString = "Some order codes are not in the inventory"
    const res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toBe(errorString)
})

test('Unsatisfiable order', () => {
    inventoryMap = {
        "VS": { 2: 100}
    }
    orderData = {"VS": 3}
    errorString = "Order unsatisfiable"
    const res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toBe(errorString)
})

