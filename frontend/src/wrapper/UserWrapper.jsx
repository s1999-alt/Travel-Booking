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
import UserProtectedRoute from '../Protected-Routes/UserProtectedRoute'
import LoginPageRoute from '../Protected-Routes/LoginPageRoute'

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
        {path: "/login/", element: (<LoginPageRoute><LoginPage/></LoginPageRoute>)},
        {path: "/logout/", element: <LogoutPage/>},
        {path: "/packages/:id", element: (<UserProtectedRoute><TourDetails/></UserProtectedRoute>)},
        {path: "/bookingconfirm/:bookingId", element: (<UserProtectedRoute><BookingConfirm/></UserProtectedRoute>)},
        {path: "/success", element: (<UserProtectedRoute><SuccessPage/></UserProtectedRoute>) }
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
        {path: "/userAccount/", element:(<UserProtectedRoute><Dashboard/></UserProtectedRoute> )},
        {path: "/userAccount/bookings", element: (<UserProtectedRoute><BookingTable/></UserProtectedRoute>)},
        {path: "/userAccount/bookings/:id", element: (<UserProtectedRoute><BookingDetailPage/></UserProtectedRoute>)},
        {path: "/userAccount/wallet/:id", element: (<UserProtectedRoute><Wallet/></UserProtectedRoute>)},
      ],
    },
  ])

  return routes
}

export default UserWrapper
