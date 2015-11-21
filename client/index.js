import element from 'virtual-element';
import {tree, render} from 'deku';
import {storePlugin} from 'deku-redux';

import createStore from './store';
import {initialize} from './store/actions';

import App from './containers/app';


function createApp() {
    const store = createStore();
    
    store.dispatch(initialize());
    
    return tree().use(storePlugin(store)).mount(<App/>);
}

render(createApp(), document.getElementById('approot'));