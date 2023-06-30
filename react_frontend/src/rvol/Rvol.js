import '../App.css';
import GetRvol from './components/GetRvol.js';
import RenderCharts from './components/RenderCharts';

export default function Rvol() {
  document.title = 'RVOL calculator and stats'
  return (
      <section className='rvol-section'>
        <GetRvol />
        <RenderCharts />
      </section>
  )
}
