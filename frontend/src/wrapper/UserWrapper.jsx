import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'
import RegisterPage from '../pages/register/RegisterPage'
import Home from '../pages/Home/Home'

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
        {path: "/register/", element: <RegisterPage/>}
      ]

    }
  ])

  return routes
}

export default UserWrapper
