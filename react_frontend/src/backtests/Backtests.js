import { useEffect, useState } from "react";

export default function Backtests() {

  useEffect(()=>{
    document.title = 'Backtests'
  })

  const [strategy, setStrategy] = useState(null)
  const [description, setDescription] = useState(null)
  const [data, setData] = useState(null)

  const strategies = {
    'Second day- green':"Measures how often a stock closes green after having an unusually strong buying day",
    'Second day- red':"Measures how often a stock closes red after having an unusually weak selling day",
    'Fresh gap- up': "Measures how often a stock holds it's gap; how often it it closes green; etc",
    'Fresh gap- down': "Measures how often a stock holds it's gap; how often it it closes red; etc"
  }
  
  const render_strategies = Object.entries(strategies).map( e => {
    return <option value={e}>{e[0]}</option>
  })

  function onSelectChange(e){
    const dataSplit = e.target.value.split(',')
    setStrategy(dataSplit[0])
    setDescription(dataSplit[1])
  }

  function handleButtonClick(){

  }

  return (
    <div className="backtest-home">
      <select onChange={onSelectChange}>
        <option value=''>---</option>
        {render_strategies}
      </select>
      {strategy && 
        <div className="strategy-choose">
          <h2>{strategy}</h2>
          <p>{description}</p>
          <button className="MyButton" onClick={handleButtonClick}>Get Stats!</button>
        </div>}
    </div>  
  );
}
