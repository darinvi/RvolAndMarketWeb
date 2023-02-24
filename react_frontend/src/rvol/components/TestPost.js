import React, {useState} from 'react'
import axios from 'axios'

export default function TestPost(){
    const [ticker,setTicker] = useState('')
    const [result,setResult] = useState('')
    
    async function getRelativeVolume(){
        try{
        axios.post('http://localhost:8000/rvol',{ticker:ticker})
        .then(res => setResult(res.data))
        } catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
        <label htmlFor='stock'>Ticker:  </label>
        <input type='text' id='stock' value={ticker} onChange={e=>setTicker(e.target.value)}></input>
        <button onClick={getRelativeVolume}>Get RVOL</button>
        {result ? <h3>RVOL: {result}</h3> : <h3>Insert Valid Ticker Name</h3>}
        </div>
    )
}