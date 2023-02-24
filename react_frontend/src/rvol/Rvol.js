import '../App.css';
import GetRvol from './components/GetRvol.js';


export default function Rvol() {
  document.title = 'RVOL calculator'
  return (
    <div className="App">
      <header className="App-header">
      <GetRvol />
      </header>
    </div>  
  );
}
