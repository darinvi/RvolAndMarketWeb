import React, {useState} from 'react'
import axios from 'axios'

export default function GetRvol(){
    const [ticker,setTicker] = useState('')
    const [result,setResult] = useState('')

    async function getRelativeVolume(){
        try{
        axios.post('http://localhost:8000/rvol',{ticker:ticker})
        .then(res => setResult(res.data))
        } catch(err){
            console.log(err)
        }
        setTicker('')
    }

    function renderData(){
        return <>
        {result==='' && <h3>Insert Ticker Name</h3>}
        {result && 
            <>
            <h3>RVOL: {result.rvol}</h3>
            <h3>ATR: {result.atr}</h3>
            </>
        }
        </>
    }

    return (
        <div>
        <label htmlFor='stock'>Ticker:  </label>
        <input type='text' id='stock' value={ticker} onChange={e=>setTicker(e.target.value)}></input>
        <button onClick={getRelativeVolume}>Get Data</button>
        {renderData()}
        </div>
    )
}