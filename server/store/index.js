import {createStore} from 'redux';
import Immutable from 'immutable';


function reducer(state = Immutable.Map({stocks: Immutable.Set()}), action) {
    switch(action.type) {
    case 'ADD_STOCK':
        return state.set('stocks', state.get('stocks').add(action.symbol.toUpperCase()));
    case 'REMOVE_STOCK':
        return state.set('stocks', state.get('stocks').delete(action.symbol));
    default:
        return state;
    }
}


export default () => {
    return createStore(reducer);
};