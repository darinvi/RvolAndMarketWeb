import './App.css';
import Rvol from './rvol/Rvol.js';
import Navbar from './Navbar.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Backtests from './backtests/Backtests';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Rvol/>} />
          <Route path="/backtest" element={<Backtests/>} />
        </Routes>
      </BrowserRouter> 
      </header>
    </div>  
  );
}

export default App;
