import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminAxios, UserAxios } from '../../../axios_instances/Axios_instance'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password:''})
  const [error, setError] = useState('')

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setCredentials({...credentials, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const responce = await UserAxios.post('api/user/token/', credentials, {
        headers: {"Content-Type": 'application/json'}
      })
      const {access} = responce.data
      const decodedToken = jwtDecode(access)
      if (decodedToken.is_staff && decodedToken.is_superuser){
        localStorage.setItem('admin_access_token', access)
        navigate('/admin/adminhome/', {replace: true})
        window.location.reload()
        toast.success('Admin Login Successfully.')
      }else{
        setError('You are not authorized to access the admin area.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  }
  

  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <h2 className="text-center mb-4">Admin Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <MDBInput
              label="Username"
              name="username"
              type="text"
              onChange={handleInputChange}
              required
              wrapperClass="mb-4"
            />
            <MDBInput
              label="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              required
              wrapperClass="mb-4"
            />
            <MDBBtn type="submit" color="primary" block>
              Login
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AdminLoginPage

