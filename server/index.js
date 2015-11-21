import http from 'http';
import express from 'express';
import socketio from 'socket.io';

import createStore from './store';
import * as actions from './store/actions';
import routes from './routes';


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const store = createStore();


io.on('connection', socket => {
    socket.on('addStock', symbol => {
        store.dispatch(actions.addStock(symbol));
    });
    
    socket.on('removeStock', symbol => {
        store.dispatch(actions.removeStock(symbol));
    });
    
    const sendStocks = () => {
        let state = store.getState().get('stocks').toJS();
        socket.emit('stocks', state);
    };
    let unsubscribe = store.subscribe(sendStocks);
    sendStocks();

    socket.on('disconnect', unsubscribe);
});

app.use(express.static('public'));

app.use(routes);


server.listen(process.env.PORT || 80, process.env.IP, () => console.log('Listening'));