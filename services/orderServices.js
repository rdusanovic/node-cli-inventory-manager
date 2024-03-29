
// Main service function
// Handles incoming order request, returns string representing an optimal order and HTTP code
// The order packaging problem is an instance of the change-making problem
function computeOrder(orderData,inventoryMap) {
    
    var order = {}
    for (const [key,value] of Object.entries(orderData)) {
        var code = key
        // Assert code is in inventory
        if (!(code in inventoryMap)) {
            return ["Some order codes are not in the inventory", 400]
        }
        //Give order size, and package sizes to the solver
        var packages = changeMaking(value, Object.keys(inventoryMap[code]))
        // Handle order unsatisfiable
        if (packages.length == 0) {
            return ["Order unsatisfiable", 200]
        }
        order[code] = {"packages": packages}
    }
    return [orderToString(order,inventoryMap), 200]
}

// Helper function to calculate the cost of an order
function calculateOrderCost(order, packageCosts) {
    var cost = 0
    for (var i = 0; i < order.length; i++) {
        cost += packageCosts[order[i]]
    }
    return cost
}

// Implementation of the change-making algorithm
// For package sizes [p1, p2, ..., pn] and order size p
// Uses dynamic programming to achieve an O(p x n) solution
// Checks whether order can be satisfied with a single package
// Otherwise checks the solution for package sizes p-p1, p-p2,...,p-pn
// And returns the minimum + 1
function changeMaking(amount, packages) {
    var table = []
    var solution = []
    for (var i = 0; i < amount; i ++)
    {
        table[i] = 0
        solution[i] = []
        // Package size for index i
        var orderSize = i + 1
        var min = Number.MAX_VALUE
        var minPackages = []
        for (var j = 0; j < packages.length; j++) {
            var packageSize = packages[j]
            // If there is an exact package, we are done
            if (packageSize == orderSize) {
                min = 1
                minPackages = [packageSize]
                break;
            }
            // Otherwise, check previous order sizes
            var prevOrderSize = orderSize - packageSize
            var prevOrderIndex = prevOrderSize - 1

            if (prevOrderSize >= 1) {
                var prevOrderSolutionSize = table[prevOrderIndex]
                if (prevOrderSolutionSize > 0) {
                    if (prevOrderSolutionSize + 1 < min) {
                        min = prevOrderSolutionSize + 1;
                        minPackages = solution[prevOrderIndex].concat([packageSize]);
                    }
                }
            }
        }
        // Updates the table if a solution is found
        if (min < Number.MAX_VALUE) {
            table[i] = min
            solution[i] = minPackages
        }

    }
    // Return the desired solution
    return solution.at(-1)
}

// Maps the order to a string 
function orderToString(order,inventoryMap) {
    var str = ''
    var orderCodes = Object.keys(order)
    for (var i = 0; i < orderCodes.length; i ++) {
        var code = orderCodes[i]
        var packages = order[code].packages
        str += code + ', $'
        var costs = inventoryMap[code]
        var cost = calculateOrderCost(packages,costs)
        str += (cost / 100.0).toString() + ', packages: '
        str += packagesToString(packages)
        str += '\n'
    }
    // Remove trailing newline
    str = str.slice(0,-1)
    return str
}

// Maps the packages in an order to a string
// Helper function for orderToString
function packagesToString(packages) {
    var packageAgg = {}
    for (var i = 0; i < packages.length; i++) {
        if (packages[i] in packageAgg) {
            packageAgg[packages[i]] += 1
        } else {
            packageAgg[packages[i]] = 1
        }
    }
    str = ''
    var packageKeys = Object.keys(packageAgg)
    for (var i = 0; i < packageKeys.length; i++) {
        str += packageAgg[packageKeys[i]].toString() + 'x' + packageKeys[i].toString() + ', '
    }
    str = str.slice(0,-2)
    return str
}

module.exports = {
    computeOrder: computeOrder
}