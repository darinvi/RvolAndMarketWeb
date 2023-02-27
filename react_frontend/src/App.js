import './App.css';
import Rvol from './rvol/Rvol.js';
import Navbar from './Navbar.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Backtests from './backtests/Backtests';
import {useState} from 'react'

function App() {
  const [logedIn,setLoggedIn] = useState(false)


  return (
    <div className="App">
      {
      !logedIn ?
      <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Rvol/>} />
          <Route path="/backtest" element={<Backtests/>} />
        </Routes>
      </BrowserRouter>
      </> :
      <>
      <h3>PASS</h3>
      </>
      }
    </div>  
  );
}

export default App;
