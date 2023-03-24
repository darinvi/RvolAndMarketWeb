export default function Login(props){

    function handleButtonClick(){
        props.setLoggedIn(true)
    }

    return (
    <>
        <h3>Please Log in</h3>
        <button onClick={handleButtonClick} className='MyButton'>Log In</button>
    </>
    )
}