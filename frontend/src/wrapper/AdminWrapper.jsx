import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import SideBar from '../AdminSide/Components/sidebar/SideBar';
import NavBar from '../AdminSide/Components/navbar/NavBar';
import AdminHome from '../AdminSide/Pages/AdminHome/AdminHome'
import AdminList from '../AdminSide/Pages/List/AdminList';
import PackageList from '../AdminSide/Pages/Packages/PackageList';
import AddPackageForm from '../AdminSide/Pages/Packages/AddPackageForm';
import EditPackageForm from '../AdminSide/Pages/Packages/EditPackageForm';
import AddPackageImage from '../AdminSide/Pages/Packages/AddPackageImage';
import CategoryList from '../AdminSide/Pages/Categories/CategoryList';
import AddCategoryForm from '../AdminSide/Pages/Categories/AddCategoryForm';
import EditCategoryForm from '../AdminSide/Pages/Categories/EditCategoryForm';
import HotelList from '../AdminSide/Pages/Hotels/HotelList';
import AddHotelForm from '../AdminSide/Pages/Hotels/AddHotelForm';
import EditHotelForm from '../AdminSide/Pages/Hotels/EditHotelForm';
import AdminBookingTable from '../AdminSide/Pages/Bookings/AdminBookingTable';
import AdminBookingDetailPage from '../AdminSide/Pages/Bookings/AdminBookingDetailPage';
import AdminLoginPage from '../AdminSide/Pages/Login/AdminLoginPage';
import AdminProtectedRoute from '../Protected-Routes/AdminProtectedRoute';
import './admin-layout.scss';



const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SideBar />
      <div className="main-content">
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}

const AdminWrapper = () => {
  const routes = useRoutes([
    { path: 'login/', element: <AdminLoginPage/> },
    {
      element: <AdminLayout/>,
      children: [
        { path: 'adminhome/', element: <AdminProtectedRoute> <AdminHome/> </AdminProtectedRoute> },

        { path: 'admin-listuser/', element: <AdminProtectedRoute> <AdminList/> </AdminProtectedRoute> },

        { path: 'package-list/', element: <AdminProtectedRoute> <PackageList/> </AdminProtectedRoute>},
        { path: 'add-package/', element: <AdminProtectedRoute> <AddPackageForm/> </AdminProtectedRoute> },
        { path: 'edit-package/:id', element: <AdminProtectedRoute> <EditPackageForm/> </AdminProtectedRoute> },
        { path: 'add-package-images/', element: <AdminProtectedRoute> <AddPackageImage/> </AdminProtectedRoute> },

        { path: 'categories-list/', element: <AdminProtectedRoute> <CategoryList/> </AdminProtectedRoute> },
        { path: 'add-category/', element: <AdminProtectedRoute> <AddCategoryForm/> </AdminProtectedRoute> },
        { path: 'edit-category/:id', element: <AdminProtectedRoute> <EditCategoryForm/> </AdminProtectedRoute> },

        { path: 'hotels-list/', element: <AdminProtectedRoute> <HotelList/> </AdminProtectedRoute>},
        { path: 'add-hotel/', element: <AdminProtectedRoute> <AddHotelForm/> </AdminProtectedRoute>},
        { path: 'edit-hotel/:id', element: <AdminProtectedRoute> <EditHotelForm/> </AdminProtectedRoute>},


        { path: 'booking-table/', element: <AdminProtectedRoute> <AdminBookingTable/> </AdminProtectedRoute>},
        { path: 'admin-booking-details/:id', element: <AdminProtectedRoute> <AdminBookingDetailPage/> </AdminProtectedRoute>},
      ],
    },
  ]);

  return routes;
};

export default AdminWrapper;
