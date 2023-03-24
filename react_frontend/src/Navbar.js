import { NavLink } from "react-router-dom";

export default function Navbar(props){

    const links = ({isActive}) => ({color: isActive ? 'white' : 'gray'})

    return(
        <>
        <div className='Navbar'>
            <NavLink to='/' className='Navlink' style={links}>RVOL</NavLink>
            <NavLink to='/second_day' className='Navlink' style={links}>BACKTESTS</NavLink>
        </div>
        <button className="LogOutButton" onClick={()=>props.setLoggedIn(false)}>Log Out</button>
        </>
    )
}