import { useEffect, useState } from "react";

export default function Backtests() {

  useEffect(() => {
    document.title = 'Backtests'
  })

  const [strategy, setStrategy] = useState(null)
  const [description, setDescription] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [symbol, setSymbol] = useState(null)
  const [result, setResult] = useState(null)

  const strategies = {
    'Second day- green': "Measures how often a stock closes green the day after having an unusually strong buying day. Criteria: Close higher than open + RVOL more than 1.5 + close in upper 80% of daily range",
    'Second day- red': "Measures how often a stock closes red the day after having an unusually weak selling day. Criteria: Close lower than open + RVOL more than 1.5 + close in lower 80% of daily range",
    'Fresh gap- up': "Measures how often the close is higher than the open and how often closes at extreme after a greather than 3% gap up",
    'Fresh gap- down': "Measures how often the close is lower than the open and how often closes at extreme after a greather than 3% gap down"
  }

  const render_strategies = Object.entries(strategies).map(e => {
    return <option value={e}>{e[0]}</option>
  })

  function onSelectChange(e) {
    setData('')
    const dataSplit = e.target.value.split(',')
    setStrategy(dataSplit[0])
    setDescription(dataSplit[1])
  }

  function handleButtonClick() {
    setData('')
    setLoading(true);
    fetch('http://localhost:8000/backtest', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker:symbol,
        strategy
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="backtest-home">
      <label htmlFor="strategy-select">Choose Strategy: </label>
      <select onChange={onSelectChange} id="strategy-select">
        <option value=''>---</option>
        {render_strategies}
      </select>
      {strategy &&
        <div className="strategy-choose">
          <h2>{strategy}</h2>
          <p>{description}</p>
          {strategy != '' &&
            <>
              <label htmlFor="stock-input">Symbol:</label>
              <input type="text" id="stock-input" onChange={e => { setSymbol(e.target.value) }}></input>
            </>}
          <button className="MyButton" onClick={handleButtonClick}>Get Stats!</button>
      {loading && <h3>Loading...</h3>}
      {data && 
        <div className="backtest-result">
          <h3>All occurances: {data.all}</h3>
          <h3>Followed through: {data.passing}</h3>
          <h3>Percentage: {data.percentage}</h3>
        </div>}
      </div>}
    </div>
  );
}
