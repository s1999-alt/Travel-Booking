import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
  const navigate = useNavigate()
  const {userInfo, updateUserInfo} = useContext(UserContext)

  useEffect(()=>{
    localStorage.removeItem('access_key')
    updateUserInfo([])
    navigate('/')
  })
  return (
    <div>
      LogoutPage
    </div>
  )
}

export default LogoutPage
