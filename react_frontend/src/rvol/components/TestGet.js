import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function TestGet(){
    const [result,setResult] = useState(null)
    const reversed_msg = async () => {
        try{
        let res = await axios.get('http://localhost:8000/stonks?word=ROTALUCLAC_LOVR')
        setResult(res.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>reversed_msg,[])
    return (
        <>
        {result}
        </>
    )
}