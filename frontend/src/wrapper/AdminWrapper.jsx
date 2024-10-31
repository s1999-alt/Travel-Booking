import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import SideBar from '../AdminSide/Components/sidebar/SideBar';
import NavBar from '../AdminSide/Components/navbar/NavBar';
import AdminHome from '../AdminSide/Pages/AdminHome/AdminHome'
import './admin-layout.scss';
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

const AdminWrapper = () => {
  const routes = useRoutes([
    {
      element: (
        <div className="admin-layout">
          <SideBar />
          <div className="main-content">
            <NavBar />
            <Outlet />
          </div>
        </div>
      ),
      children: [
        { path: 'adminhome/', element: <AdminHome/> },

        { path: 'admin-listuser/', element: <AdminList/> },

        { path: 'package-list/', element: <PackageList/> },
        { path: 'add-package/', element: <AddPackageForm/> },
        { path: 'edit-package/:id', element: <EditPackageForm/> },
        { path: 'add-package-images/', element: <AddPackageImage/> },

        { path: 'categories-list/', element: <CategoryList/> },
        { path: 'add-category/', element: <AddCategoryForm/> },
        { path: 'edit-category/:id', element: <EditCategoryForm/> },

        { path: 'hotels-list/', element: <HotelList/>},
        { path: 'add-hotel/', element: <AddHotelForm/>},
        { path: 'edit-hotel/:id', element: <EditHotelForm/>},
      ],
    },
  ]);

  return routes;
};

export default AdminWrapper;
