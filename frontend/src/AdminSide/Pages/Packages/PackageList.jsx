import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../axios_instances/Axios_instance'
import { Link } from 'react-router-dom'
import './package-list.css'

const PackageList = () => {
  const [packages, setPackages] = useState([])

  useEffect(()=>{
    const fetchPackages = async ()=>{
      try {
        const responce = await AdminAxios.get('api/admin/packages/')
        setPackages(responce.data)
      } catch (error) {
        console.log('Error Fetching packages', error)
      }
    }
    fetchPackages()
  },[])

  const handleBlockUnblock = async (packageId, isActive)=>{
    try {
      await AdminAxios.patch(`api/admin/packages/block/${packageId}/`)
      setPackages(prevPackages =>
        prevPackages.map(pack=>
          pack.id === packageId ? {...pack, is_active: !isActive} : pack
        )
      )
    } catch (error) {
      console.error('Error updating packages')
    }
  }

  const handleDelete = async (packageId) => {
    try {
      await AdminAxios.delete(`api/user/packages/${packageId}`)
      const responce = await AdminAxios.get('api/admin/packages/')
      setPackages(responce.data)
    } catch (error) {
      console.log('Error deleting package', error)
    }
  }

  return (
    <div className='package-list-container'>
      <h2 className="package-list-heading">Package List</h2>
      <Link to="/admin/add-package/">
          <button className="add-packages-button">Add Package</button> 
      </Link>
      <table className="package-list-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Package Name</th>
            <th>Image</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Status</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pack) => (
            <tr key={pack.id}>
              <td>{pack.id}</td>
              <td>{pack.package_name}</td>
              <td><img src={pack.image} alt={pack.package_name} /></td>
              <td>{pack.duration}</td>
              <td>{pack.price}</td>
              <td>{pack.sale_price}</td>
              <td style={{fontWeight:'bold', color: pack.is_active ? 'green' : 'red'}}>{pack.is_active ? 'Available' : 'Not Available'}</td>
              <td>{pack.category_name}</td>
              <td>
                {pack.is_active && (
                  <button style={{backgroundColor:'red'}} onClick={() => handleBlockUnblock(pack.id, pack.is_active)}>
                    Unlist 
                  </button>
                )}
                {!pack.is_active && (
                  <button onClick={() => handleBlockUnblock(pack.id , pack.is_active) }>
                    List
                  </button>
                )
                }
                {/* <button style={{backgroundColor:'grey'}} onClick={() => handleEdit(pack.id)}>Edit</button> */}
                <button className='delete-button' onClick={() => handleDelete(pack.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PackageList
