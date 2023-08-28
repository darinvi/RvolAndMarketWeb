import { useState } from "react"
import getHash from "../scripts/getHash"

export default function RegisterForm(props){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmitForm(e){
        e.preventDefault()
        localStorage.setItem('username', username)
        localStorage.setItem('password', await getHash(password))
        props.loggedIn(true)
        return 
    }

    return (<form onSubmit={handleSubmitForm}>
           <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
           <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
           <button type="submit" disabled={username ? false : true}>Submit</button>
    </form>)
}