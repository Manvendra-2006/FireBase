import React, { useState } from 'react'
import { useAuth } from '../FireBase/FireBaseProvider.jsx'

const SignUp = () => {
    const firebase = useAuth()
    console.log(firebase)
    const [email,setemail] = useState('')
    const [password,setpasssword] = useState('')
    const signup = () =>{
    firebase.signup(email,password)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const signupwithgoogle = () =>{
        firebase.signupwithgoogle()
    }
    const signupwithgithub = () =>{
        firebase.signupwithgithub()
    }
  return (
    <div>
        <form action="">
            <label htmlFor="">Email</label>
            <input type="text"  placeholder='Enter Email' name='email' value={email} onChange={(event)=>setemail(event.target.value)}/>
            <br />
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Enter Password' name='password' value={password} onChange={(event)=>setpasssword(event.target.value)} />
            <br />
            <button type='button' onClick={signup}>SignUp</button>
            <hr /><br />
            <button type='button' onClick={signupwithgoogle}>SignUp with Googgle</button>
            <br /><hr />
            <button type='button' onClick={signupwithgithub}>SignUp with Github</button>
            <a href=""></a>
        </form>
    </div>
  )
}

export default SignUp