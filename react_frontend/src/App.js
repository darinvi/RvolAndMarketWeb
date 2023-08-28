import './css/site.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react'
import Rvol from './components/Rvol.js';
import Navbar from './Navbar.js'
import Login  from './components/Login';
import Backtests from './components/Backtests';

function App() {
  const [logedIn,setLoggedIn] = useState(false)


  return (
    <div className={`${logedIn ? 'App' : 'NotLogged'}`}>
      {
      logedIn ?
      <>
      <BrowserRouter>
        <Navbar setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/" element={<Rvol/>} />
          <Route path="/backtest" element={<Backtests/>} />
        </Routes>
      </BrowserRouter>
      </> :
      <>
      <Login setLoggedIn={setLoggedIn} />
      </>
      }
    </div>  
  );
}

export default App;
