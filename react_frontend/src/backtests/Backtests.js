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

  const strategies = {
    'Second day- green': "Measures how often a stock closes green after having an unusually strong buying day",
    'Second day- red': "Measures how often a stock closes red after having an unusually weak selling day",
    'Fresh gap- up': "Measures how often a stock holds it's gap; how often it it closes green; etc",
    'Fresh gap- down': "Measures how often a stock holds it's gap; how often it it closes red; etc"
  }

  const render_strategies = Object.entries(strategies).map(e => {
    return <option value={e}>{e[0]}</option>
  })

  function onSelectChange(e) {
    const dataSplit = e.target.value.split(',')
    setStrategy(dataSplit[0])
    setDescription(dataSplit[1])
  }

  function handleButtonClick() {
    setLoading(true);
    fetch('http://localhost:8000/backtest', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ticker:symbol}),
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
        </div>}
    {loading && <h3>Loading...</h3>}
    {data && <h3>{data.ticker}</h3>}
    </div>
  );
}
