export default function Login(props){

    function handleButtonClick(){
        props.setLoggedIn(true)
    }

    return (
    <div>
        <h3>Please Log in</h3>
        <button onClick={handleButtonClick} className='MyButton'>Log In</button>
        <button onClick={()=>console.log('Register button clicked')} className='MyButton'>Register</button>
    </div>
    )
} 