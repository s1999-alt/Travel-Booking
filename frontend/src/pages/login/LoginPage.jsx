import React, { useState } from 'react';
import Lottie from 'lottie-react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import '../register/register.css'
import astronaut from '../../assets/astronaut.json'
import { UserAxios } from '../../axios_instances/Axios_instance';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState([])

  const doLogin = async() =>{
    const responce = await UserAxios.post('api/user/token/',form, {
      headers:{
        "Content-Type":"application/json"
      }
    })

    if (responce.status === 200) {
      const data = await responce.data
      localStorage.setItem('access_key', data.access)
      navigate('/', { replace: true})
      window.location.reload()
    }else{
      console.error('Login failed')
    }
  }

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setForm({...form, [name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    doLogin()
  }


  return (
    <MDBContainer fluid className="p-5 my-5 h-custom">

      <MDBRow className="d-flex justify-content-center align-items-center">

        {/* Image Column */}
        <MDBCol md="5" lg="4" className="d-none d-md-block">
          <Lottie
            animationData={astronaut}  
            loop
            autoplay
            style={{ height: '400px', width: '400px' }} 
          />
        </MDBCol>

        {/* Form Column */}
        <MDBCol md="7" lg="5">

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Login</p>
          </div>

          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="formControlLg"
              name='username'
              type="username"
              size="lg"
              onChange={handleInputChange}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              name='password'
              id="formControlLg"
              type="password"
              size="lg"
              onChange={handleInputChange}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn type='submit' className="mb-0 px-5" size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{' '}
                <a href="#!" className="link-danger">
                  Register
                </a>
              </p>
            </div>
          </form>
        </MDBCol>

      </MDBRow>

    
    </MDBContainer>
  );
}

export default LoginPage;