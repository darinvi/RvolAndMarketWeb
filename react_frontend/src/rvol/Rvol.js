import GetRvol from './components/GetRvol.js';
import RenderCharts from './components/RenderCharts';
import { useEffect } from 'react';

export default function Rvol() {
  
  useEffect(()=>{
    document.title = 'RVOL calculator and stats'
  })
  return (
      <section className='rvol-section'>
        <GetRvol />
        <RenderCharts />
      </section>
  )
}
