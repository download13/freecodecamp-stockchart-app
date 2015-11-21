/*global Chart*/
import element from 'virtual-element';


export default {
    initialState() {
        return {
            chart: createChartManager()
        };
    },
    render({props}) {
        return <canvas class="graph" width="600" height="400" />;
    },
    afterRender({props, state}, el) {
        let {stocks} = props;
        let context = el.getContext('2d');
        
        if(stocks.length > 0) {
            let chartData = {
                labels: stocks[0].data.map(item => item[0]),
                datasets: stocks.map(({symbol, data, color}) => {
                    return {
                        label: symbol,
                        strokeColor: color,
                        fillColor: 'rgba(0,0,0,0)',
                        pointColor: color,
                        pointStrokeColor: '#fff',
                        pointHightlightFill: '#fff',
                        pointHightlightStroke: color,
                        data: data.map(item => item[1])
                    };
                })
            };
            
            state.chart(context, chartData, {
                pointHitDetectionRadius: 5,
                bezierCurve: false
            });
        }
    },
    beforeUnmount({state}) {
        state.chart();
    }
};


function createChartManager() {
    let chart;
    
    return (context, chartData, config) => {
        if(chart) {
            chart.destroy();
            chart = null;
        }
        
        if(context && chartData) {
            chart = new Chart(context).Line(chartData, config);
        }
    };
}