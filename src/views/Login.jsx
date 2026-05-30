import {TextField} from '@mui/material'
import React from 'react'


const Login = () => {

    const[username, setUsername] = useState ("")
    const [password, setPassword] = useState("")
    const onsubmit = (e) => {
        e.preventDefault()
        if(!username || !password){
            alert("las credenciales o deben estar vacias")
            return 
        }
        const res = login({username:username,password:password})
        if (res.islogin === true){
            Navigate("/profile")
        }

    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <TextField value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>
            <TextField value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
            <Button type='submit'>Login</Button>
        </form>
        </>
    )
}


export default Login