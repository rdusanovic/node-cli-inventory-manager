const orderServices = require('../../services/OrderServices.js')

test('Correct order string is returned', () => {
    inventoryMap = {
        "VS": { 2: 100, 5: 100, 7: 100},
        "BM": { 1: 100, 2: 100, 5: 100}
    }
    orderData = {"VS": 12, "BM": 5}
    order = ["VS, $2, packages: 1x5, 1x7\nBM, $1, packages: 1x5", 200]
    res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toStrictEqual(order);
})

test('Invalid order code', () => {
    inventoryMap = {
        "VS": { 2: 100, 5: 100, 7: 100},
    }
    orderData = {"BM": 2}
    error = ["Some order codes are not in the inventory", 400]
    res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toStrictEqual(error)
})

test('Unsatisfiable order', () => {
    inventoryMap = {
        "VS": { 2: 100}
    }
    orderData = {"VS": 3}
    error = ["Order unsatisfiable", 200]
    res = orderServices.computeOrder(orderData,inventoryMap)
    expect(res).toStrictEqual(error)
})

