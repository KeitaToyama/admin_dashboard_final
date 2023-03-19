import React from 'react'
import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
const Login = () => {

const signIn = () => {

    signInWithPopup(auth, provider).catch((err) => {alert(err.message)})
}

  return (
    
    
        <Button onClick={signIn}>ログイン</Button>
    
  )
    }
export default Login