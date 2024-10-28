import React from 'react'
import './admin-home.scss'
import SideBar from '../../Components/sidebar/SideBar'
import NavBar from '../../Components/navbar/NavBar'

const AdminHome = () => {
  return (
    <div className='admin-home' style={{color: 'black'}}>
      <SideBar/>
      <div className="homeContainer">
        <NavBar/>
        <div className="widgets">
          
        </div>
      </div>
    </div>
  )
}

export default AdminHome

