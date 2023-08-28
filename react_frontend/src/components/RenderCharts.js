import Plot from 'react-plotly.js';

export default function RenderCharts(props) {

    const opens = Object.values(props.result.historical).map(e => {
        return e.Open
    })
    const highs = Object.values(props.result.historical).map(e => {
        return e.High
    })
    const lows = Object.values(props.result.historical).map(e => {
        return e.Low
    })
    const closes = Object.values(props.result.historical).map(e => {
        return e.Close
    })
    const dates = Object.values(props.result.historical).map(e => {
        return e.Date
    })

    const data = [
        {
            type: 'candlestick',
            x: dates,
            open: opens,
            high: highs,
            low: lows,
            close: closes,
        },
    ];
    const layout = {
        title: 'Candlestick Chart Example',
        xaxis: { 
            title: 'Date',
            rangebreaks: { pattern: 'day of week', bounds: [6, 1] }
        },
        yaxis: { title: 'Price' },
      };

    return (
        <div className='RenderCharts'>
            <h3>Daily candlestick chart</h3>
            <Plot data={data} layout={layout} />
        </div>
    )
}