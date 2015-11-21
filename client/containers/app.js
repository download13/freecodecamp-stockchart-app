import element from 'virtual-element';
import {connect} from 'deku-redux';
import {bindActionCreators} from 'redux';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

import StockGraph from '../components/stockgraph.js';
import StockTag from '../components/stocktag.js';


const App = {
    render({props}) {
        let {
            stocks,
            addSymbol,
            removeSymbol
        } = props;
        
        return <div>
            <StockGraph stocks={stocks} />
            <div class="stocktag-holder">
                {stocks ? stocks.map(({symbol, color}) => {
                    return <StockTag
                        symbol={symbol}
                        color={color}
                        onRemove={() => removeSymbol(symbol)}
                    />;
                }) : null}
            </div>
            <input class="symbol-in" placeholder="Add Symbol" onKeyUp={e => {
                if(e.keyCode === 13) {
                    addSymbol(e.target.value);
                    e.target.value = '';
                }
            }} />
        </div>;
    }
};

export default connect(
    state => ({
        stocks: selectors.stockDatas(state)
    }),
    dispatch => bindActionCreators({
        addSymbol: actions.addSymbol,
        removeSymbol: actions.removeSymbol
    }, dispatch)
)(App);