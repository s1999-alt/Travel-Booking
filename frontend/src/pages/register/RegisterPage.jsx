import React from 'react';
import Lottie from 'lottie-react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import './register.css';
import astronaut from '../../assets/astronaut.json'

function RegisterPage() {
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
            <p className="text-center fw-bold mx-3 mb-0">Sign Up / Register</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlLg"
            name='username'
            type="text"
            size="lg"
          />

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            name='email'
            type="email"
            size="lg"
          />
          

          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            name='password'
            id="formControlLg"
            type="password"
            size="lg"
          />

          <MDBInput
            wrapperClass="mb-4"
            label="Confirm Password"
            id="formControlLg"
            name='password2'
            type="password"
            size="lg"
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
            <MDBBtn className="mb-0 px-5" size="lg">
              Register
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{' '}
              <a href="#!" className="link-danger">
                Login
              </a>
            </p>
          </div>
        </MDBCol>

      </MDBRow>

    
    </MDBContainer>
  );
}

export default RegisterPage;
