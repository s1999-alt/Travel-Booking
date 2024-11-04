import React from 'react'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AdminProtectedRoute = ({children}) => {
  const token = localStorage.getItem('admin_access_token')

  if (token){
    const decodedToken = jwtDecode(token)
    if(decodedToken.is_staff || decodedToken.is_superuser){
      return children
    }
  }
  return <Navigate to='/admin/login/' replace/>
}

export default AdminProtectedRoute
