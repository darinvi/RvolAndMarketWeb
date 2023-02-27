import React, {useState} from 'react'
import axios from 'axios'

export default function GetRvol(){
    const [ticker,setTicker] = useState('')
    const [result,setResult] = useState('')
    const [loading,setLoading] = useState(false)

    function handleLoading(){
        return <h3>Loading...</h3>
    }
    
    async function getRelativeVolume(){
        setLoading((curr)=>!curr)
        try{
            const res = await axios.post('http://localhost:8000/rvol',{ticker:ticker})
            setResult(res.data)

        } catch(err){
            console.log(err)
        }
        setTicker('')
        setLoading((curr)=>!curr)
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
        <div className='getRvol'>
        <label htmlFor='stock'>Ticker:  </label>
        <input type='text' id='stock' value={ticker} onChange={e=>setTicker(e.target.value)}></input>
        <button onClick={getRelativeVolume} className='MyButton'>Get Data</button>
        { loading ? handleLoading() : renderData()}
        </div>
    )
}