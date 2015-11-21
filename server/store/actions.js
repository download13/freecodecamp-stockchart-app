export function addStock(symbol) {
    return {type: 'ADD_STOCK', symbol};
}

export function removeStock(symbol) {
    return {type: 'REMOVE_STOCK', symbol};
}