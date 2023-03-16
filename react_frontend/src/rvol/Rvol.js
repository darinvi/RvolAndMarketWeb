import '../App.css';
import GetRvol from './components/GetRvol.js';
import RenderCharts from './components/RenderCharts';

export default function Rvol() {
  document.title = 'RVOL calculator and stats'
  return (
      <>
      <GetRvol />
      <RenderCharts />
      </>
  )
}
