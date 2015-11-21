import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';


const finalCreateStore = applyMiddleware(thunk)(createStore);

export default () => {
    return finalCreateStore(reducer);
};


const initialState = Immutable.Map({
    stocks: Immutable.Set(),
    stockData: Immutable.Map()
});

function reducer(state = initialState, action) {
    switch(action.type) {
    case 'SET_STOCKS':
        return state.set('stocks', Immutable.Set(action.stocks));
    case 'SET_STOCK_DATA':
        return state.set('stockData', state.get('stockData').set(action.symbol, action.stock));
    case 'SET_SOCKET':
        return state.set('socket', action.socket);
    default:
        return state;
    }
}