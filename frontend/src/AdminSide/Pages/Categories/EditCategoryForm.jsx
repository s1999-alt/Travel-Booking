import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminAxios } from '../../../axios_instances/Axios_instance'
import { toast } from 'react-toastify'



const EditCategoryForm = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    category_name : '',
    is_available : true,
    soft_deleted: false,
    category_image: null,
  })

  const [imageURL, setImageURL] = useState('');
  const [fileInput, setFileInput] = useState(null);

  useEffect( () => {
    const fetchCategoryDetails = async () =>{
      try {
        const response = await AdminAxios.get(`api/admin/categories/${id}/`)
        const {category_name, is_available, soft_deleted, category_image} = response.data
        setFormData({
          category_name,
          is_available,
          soft_deleted,
        })
        setImageURL(category_image);
        console.log("======================",response.data);
      } catch (error) {
        console.log('Error fetching category details', error)
      }
    }
    fetchCategoryDetails()
  },[id])

  const handleInputChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileInput(selectedFile);
    setImageURL(selectedFile ? selectedFile.name : '');
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const categoryData = new FormData()
    for (const key in formData){
      categoryData.append(key, formData[key])
    }

    if (fileInput) {
      categoryData.append('category_image', fileInput)
    }

    try {
      const response = await AdminAxios.put(`api/admin/categories/update/${id}/`, categoryData)
      console.log('Category updated:', response.data);
      navigate('/admin/categories-list/')
      toast.success('Category updated Successfully');

    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`An error occurred during category updation: ${error.message}`); 
    }
  }


  return (
    <div className='addcategory-container'>
      <h2 className="heading">Add Category</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className='label'>
          Category Name:
          <input
            className='input'
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Is Available:
          <select
            className='select'
            name="is_available"
            value={formData.is_available}
            onChange={handleInputChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className='label'>
          Category Image:
          <input
            className='input'
            type="text"
            value={imageURL}
            name="category_image"
            readOnly
          />
          {imageURL && <img src={imageURL} style={{maxWidth:'10%',marginLeft:'10px'}} alt='Category Preview' />}
        </label>
        <label className='label'>
          Choose new image:
          <input
            className='input'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button className='button' type="submit">update Category</button>
      </form>
    </div>
  )
}

export default EditCategoryForm
