import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Backtests from './backtests/Backtests';
import {useState} from 'react'
import Rvol from './rvol/Rvol.js';
import Navbar from './Navbar.js'
import Login  from './login/Login';

function App() {
  const [logedIn,setLoggedIn] = useState(false)
  // const [logedIn,setLoggedIn] = useState(true)


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
