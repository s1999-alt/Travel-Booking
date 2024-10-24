import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'
import RegisterPage from '../pages/register/RegisterPage'
import LoginPage from '../pages/login/LoginPage'
import Home from '../pages/Home/Home'
import TourDetails from '../pages/TourDetails/TourDetails'
import LogoutPage from '../pages/logout/LogoutPage'
import BookingConfirm from '../pages/BookingConfirm/BookingConfirm'

const UserWrapper = () => {
  const routes = useRoutes([
    {
      element:(
        <>
        <Nav/>

          <Outlet/>

        <Footer/>
        </>
      ),

      children:[
        {path: "/", element: <Home/>},
        {path: "/register/", element: <RegisterPage/>},
        {path: "/login/", element: <LoginPage/>},
        {path: "/logout/", element: <LogoutPage/>},
        {path: "/packages/:id", element: <TourDetails/>},
        {path: "/bookingconfirm/:bookingId", element:<BookingConfirm/>},
      ]
    }
  ])

  return routes
}

export default UserWrapper
