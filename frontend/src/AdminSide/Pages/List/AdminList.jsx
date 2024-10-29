import React from 'react'
import './admin-list.scss'
import UserListTable from '../../Components/userListTable/UserListTable'

const AdminList = () => {
  return (
    <div className='list'>
      <div className="listContainer">
        <UserListTable/>
      </div>
    </div>
  )
}

export default AdminList
