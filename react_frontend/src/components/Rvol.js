import { useEffect, useState } from 'react';
import GetRvol from './GetRvol.js';
import RenderCharts from './RenderCharts.js';

export default function Rvol() {
  
  const [data, setData] = useState('')

  useEffect(()=>{
    document.title = 'Relative Volume'
  })

  return (
      <section className='rvol-section'>
        <GetRvol result={data} setResult={setData} />
        {data.historical && <RenderCharts result={data} />}
      </section>
  )
}
