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
import SuccessPage from '../pages/BookingSuccess/SuccessPage'
import UserAccount from '../pages/UserAccount/UserAccount'
import Dashboard from '../pages/UserAccount/Dashboard'
import BookingTable from '../pages/UserAccount/BookingTable'
import BookingDetailPage from '../pages/UserAccount/BookingDetailPage'
import Wallet from '../pages/UserAccount/Wallet'

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
        {path: "/success", element: <SuccessPage/>}
      ],
    },

    {
      element:(
        <>
         <Nav/>
         <UserAccount>

          <Outlet/>

         </UserAccount>
         <Footer/>
        </>
      ),
      children:[
        {path: "/userAccount/", element: <Dashboard/>},
        {path: "/userAccount/bookings", element: <BookingTable/>},
        {path: "/userAccount/bookings/:id", element: <BookingDetailPage/>},
        {path: "/userAccount/wallet/:id", element: <Wallet/>},
      ],
    },
  ])

  return routes
}

export default UserWrapper
