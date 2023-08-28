import RegisterForm from "./RegiserForm"
import { useState } from "react"

export default function Login(props) {

    const [renderFrom, setRenderForm] = useState(false)
    const [isRegistered, setIsRegistered] = useState(hasRegisteredUser())

    function handleButtonClick() {
        if (hasRegisteredUser()) {
            props.setLoggedIn(true)
        } else {
            alert('Please, register')
        }
    }

    function hasRegisteredUser() {
        let hasUsername;
        let hasPassword;

        try {
            hasUsername = localStorage.getItem('username')
            hasPassword = localStorage.getItem('password')
            
            if (hasUsername && hasPassword) {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    function handleDeleteButton(){
        try {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            setIsRegistered(false)
        } catch {
            console.log('no user')
        }
    }

    return (
        <div>
            {renderFrom ?
                <RegisterForm loggedIn={props.setLoggedIn} /> :
                <>
                    <h1>Please Log in</h1>
                    <button onClick={handleButtonClick} className='MyButton'>Log In</button>
                    {
                        isRegistered ?
                            <button onClick={handleDeleteButton} className="MyButton">Delete {localStorage.getItem('username')}</button> :
                            <button onClick={() => setRenderForm(true)} className='MyButton'>Register</button>
                    }
                </>
            }
        </div>
    )
} 