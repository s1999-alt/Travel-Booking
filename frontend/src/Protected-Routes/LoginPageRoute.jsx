import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'


const LoginPageRoute = ({children}) => {
  const {userInfo} = useContext(UserContext)

  if (userInfo.username){
    return <Navigate to="/" replace />
  }
  return children
}

export default LoginPageRoute
