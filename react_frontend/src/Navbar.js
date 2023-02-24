import { NavLink } from "react-router-dom";

export default function Navbar(){
    return(
        <div className='Navbar'>
            <NavLink to='/' className='Navlink' style={({isActive}) => ({color: isActive ? 'white' : 'gray'})}>RVOL</NavLink>
            <NavLink to='/second_day' className='Navlink' style={({isActive}) => ({color: isActive ? 'white' : 'gray'})}>Backtests</NavLink>
        </div>
    )
}