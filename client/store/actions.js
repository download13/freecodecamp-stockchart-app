import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';

import * as selectors from './selectors';


export function initialize() {
    return (dispatch, getState) => {
        let socket = io();
        
        dispatch(setSocket(socket));
        
        socket.on('stocks', stocks => {
            let stockData = selectors.stockData(getState());
            
            // Each stock that is not already in the store must be loaded
            stocks.forEach(symbol => {
                if(!(symbol in stockData)) {
                    dispatch(loadStock(symbol));
                }
            });
            
            dispatch(setStocks(stocks));
        });
    }
}

export function addSymbol(symbol) {
    return (dispatch, getState) => {
        let socket = selectors.socket(getState());
        if(socket) {
            socket.emit('addStock', symbol);
        }
    }
}

export function removeSymbol(symbol) {
    return (dispatch, getState) => {
        let socket = selectors.socket(getState());
        if(socket) {
            socket.emit('removeStock', symbol);
        }
    }
}

export function loadStock(symbol) {
    return (dispatch, getState) => {
        fetch('/stock/' + symbol)
        .then(res => res.json())
        .then(stock => {
            dispatch(setStockData(symbol, stock));
        });
    }
}


function setSocket(socket) {
    return {type: 'SET_SOCKET', socket};
}

function setStocks(stocks) {
    return {type: 'SET_STOCKS', stocks};
}

function setStockData(symbol, stock) {
    return {type: 'SET_STOCK_DATA', symbol, stock};
}