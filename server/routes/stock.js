import request from 'request';
import qs from 'querystring';
import crypto from 'crypto';
import randomColor from 'randomcolor';
import AsyncCache from 'async-cache';


const QUANDL_API_KEY = 'yzjCDoA-ey5Y1NpUedpT';
const QUANDL_API_QUERY = qs.stringify({
    auth_token: QUANDL_API_KEY,
    rows: 15,
    column_index: 11 // Adjusted closing price
});


export default (req, res) => {
    const {symbol} = req.params;
    const upperSymbol = symbol.toUpperCase();
    
    if(symbol !== upperSymbol) {
        res.redirect('/stock/' + upperSymbol);
        return;
    }
    
    cachedStocks.get(symbol, (err, stock) => {
        if(err) {
            res.status(404).send(err);
        } else {
            res.json(stock);
        }
    });
};


const cachedStocks = new AsyncCache({
    max: 50 * 1024,
    maxAge: 60 * 60 * 1000,
    stale: true,
    load(symbol, cb) {
        request(`https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json?${QUANDL_API_QUERY}`, (err, response, body) => {
            if(err) {
                console.log('stock err', err, response.statusCode);
                cb(err);
                return;
            }
            if(response.statusCode === 404) {
                cb('Invalid symbol');
                return;
            }
            
            try {
                let stock = {
                    data: JSON.parse(body).dataset_data.data,
                    color: randomColor(),
                    symbol
                };
                
                cb(null, stock);
            } catch(e) {
                console.error(e);
                cb('Error parsing data');
            }
        });
    }
});
