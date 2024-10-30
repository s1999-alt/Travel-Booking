import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminAxios } from '../../../axios_instances/Axios_instance';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AdminAxios.get('api/admin/categories/list/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleBlockUnblock = async (categoryId, isAvailable) => {
    try {
      await AdminAxios.patch(`api/admin/categories/block/${categoryId}/`);
      setCategories(prevCategories => 
        prevCategories.map(category =>
          category.id === categoryId ? { ...category, is_available: !isAvailable } : category
        )
      );
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // const handleEdit = (categoryId) =>{
  //   navigate(`/admin/edit-category/${categoryId}`)
  // }

  return (
    <div className='category-list-container'>
      <h2 className='category-list-heading'>Category List</h2>
      <Link to="/admin/add-category">
          <button className="add-packages-button">Add Categories</button> 
      </Link>
      <table className='category-list-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td><img src={category.category_image} alt={category.category_name} /></td>
              <td>{category.category_name}</td>
              <td style={{fontWeight: 'bold', color: category.is_available ? 'green' : 'red' }}>
                {category.is_available ? 'Available' : 'Unavailable'}
              </td>
              <td>
                {category.is_available && (
                  <button style={{backgroundColor:"red"}} onClick={() => handleBlockUnblock(category.id, category.is_available)}>
                    Unlist
                  </button> 
                )}
                {!category.is_available && (
                  <button onClick={() => handleBlockUnblock(category.id, category.is_available)}>
                    List
                  </button>
                )}
                {/* <button onClick={() => handleEdit(category.id)}>Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryList
