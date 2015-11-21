import {createSelector} from 'reselect';


export const socket = state => state.get('socket');

export const stocks = state => state.get('stocks').toArray();

export const stockData = state => state.get('stockData').toObject();

export const stockDatas = createSelector(
    stocks,
    stockData,
    (stocks, stockData) => {
        return stocks
        .map(symbol => stockData[symbol])
        .filter(stock => stock !== undefined);
    }
);