import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const UserProtectedRoute = ({children}) => {
  const {userInfo} = useContext(UserContext)

  if (!userInfo.access_token){
    toast.warning('Please Login')
    return <Navigate to='/login/' replace/>
  }
  return children
}

export default UserProtectedRoute
