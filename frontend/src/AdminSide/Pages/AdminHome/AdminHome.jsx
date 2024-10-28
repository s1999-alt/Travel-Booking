import React from 'react'
import './admin-home.scss'
import SideBar from '../../Components/sidebar/SideBar'
import NavBar from '../../Components/navbar/NavBar'
import Widget from '../../Components/widget/Widget'
import Featured from '../../Components/featured/Featured'
import Chart from '../../Components/charts/Chart'

const AdminHome = () => {
  return (
    <div className='admin-home' style={{color: 'black'}}>
      <SideBar/>
      <div className="homeContainer">
        <NavBar/>
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="earning"/>
          <Widget type="balance"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
