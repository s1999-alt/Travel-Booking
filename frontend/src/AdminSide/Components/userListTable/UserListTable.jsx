import React, { useState, useEffect } from 'react';
import './user-list-table.scss';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { AdminAxios } from '../../../axios_instances/Axios_instance';

const UserListTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AdminAxios.get('api/admin/users/');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      const response = await AdminAxios.post(`api/admin/users/${userId}/blockunblock/`);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: response.data.is_active } : user
      ));
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { 
      field: 'is_active', 
      headerName: 'Status', 
      width: 160, 
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.value ? 'active' : 'inactive'}`}>
          {params.value ? 'Active' : 'Blocked'}
        </div>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <button
            onClick={() => handleToggleStatus(params.row.id)}
            className={params.row.is_active ? 'BlockButton' : 'unblockButton'}
          >
            {params.row.is_active ? 'Block' : 'Unblock'}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className='userListTable'>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default UserListTable;

