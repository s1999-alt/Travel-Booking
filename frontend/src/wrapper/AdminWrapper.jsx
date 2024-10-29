import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import SideBar from '../AdminSide/Components/sidebar/SideBar';
import NavBar from '../AdminSide/Components/navbar/NavBar';
import AdminHome from '../AdminSide/Pages/AdminHome/AdminHome'
import './admin-layout.scss';
import AdminList from '../AdminSide/Pages/List/AdminList';
import PackageList from '../AdminSide/Pages/Packages/PackageList';
import AddPackageForm from '../AdminSide/Pages/Packages/AddPackageForm';

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
      ],
    },
  ]);

  return routes;
};

export default AdminWrapper;
