import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'
import Home from '../Components/Home'

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
        {path: "/", element: <Home/>}
      ]

    }
  ])

  return routes
}

export default UserWrapper
