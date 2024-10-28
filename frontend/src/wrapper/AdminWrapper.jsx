import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import AdminHome from '../AdminSide/Pages/AdminHome/AdminHome'

const AdminWrapper = () => {
  const routes = useRoutes([
    {
      element:(
        <>
          <Outlet/>
        </>
      ),

      children:[
        {path: "adminhome", element: <AdminHome/>},
      ]
    }
  ])

  
  return routes
}

export default AdminWrapper
