import React, { useState } from 'react'
import axios from 'axios'

export default function GetRvol() {
    const [ticker, setTicker] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    function handleLoading() {
        return <h3>Loading...</h3>
    }

    async function getRelativeVolume() {
        setLoading((curr) => !curr)
        try {
            const res = await axios.post('http://localhost:8000/rvol', { ticker: ticker })
            setResult(res.data)
        } catch (err) {
            console.log(err)
        }
        setTicker('')
        setLoading((curr) => !curr)
    }

    function renderData() {
        const render_result = result && Object.entries(result).map(e => {
            if (e[0] != 'data') {
                return <h3>{e[0]}: {e[1]}</h3>
            }
        })

        return (
            <div className='rvol-result'>
                {result === '' ? <h3>Insert Ticker Name</h3> : render_result}
            </div>
        )
    }

    return (
        <div className='getRvol'>
            <div className='rvol-input'>
                <label htmlFor='stock'>Ticker:</label>
                <input type='text' id='stock' value={ticker} onChange={e => setTicker(e.target.value)}></input>
                <button onClick={getRelativeVolume} className='MyButton'>Get Data</button>
            </div>
            {loading ? handleLoading() : renderData()}
        </div>
    )
}