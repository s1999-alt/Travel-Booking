import React, { useEffect, useState } from 'react'
import './add-packageform.css'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { AdminAxios } from '../../../axios_instances/Axios_instance'

const AddPackageForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    package_name: '',
    duration: '',
    price: '',
    sale_price: '',
    overview: '',
    category: '',
    continent:'',
    image: [],
    city: '',
    country:'',
    rating:'',
    is_active: false,
    inclusions: [], 
    exclusions: [], 
    hotels: [],
  })

  const [categories, setCategories] = useState([])
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [continent, setContinent] = useState([])

  useEffect(()=>{
    const fetchCategories = async () =>{
      try {
        const categoryResponse = await AdminAxios.get('api/admin/categories/list/')
        const inclusionResponse = await AdminAxios.get('api/admin/inclusions/');
        const exclusionResponse = await AdminAxios.get('api/admin/exclusions/');
        const hotelResponse = await AdminAxios.get('api/admin/hotels/list/');
        const continentResponse = await AdminAxios.get('api/admin/continents/');

        setCategories(categoryResponse.data);
        setInclusions(inclusionResponse.data);
        setExclusions(exclusionResponse.data);
        setHotels(hotelResponse.data);
        setContinent(continentResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories()
  },[])


  const handleInputChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0]})
  }

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, is_active: e.target.checked});
  }

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedOptions });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const packageData = new FormData()
    for (const key in formData){
      packageData.append(key, formData[key])
    }

    try{
      const response = await AdminAxios.post('api/admin/packages/create/', packageData)
      console.log('Package added:', response.data);
      navigate('/admin/package-list/')
      toast.success('Package Added Successfully')

    }catch(error){
      console.error('Error adding package:', error)

      if (error.response && error.response.status === 400 && error.response.data && error.response.data.package_name){
        toast.error(` '${error.response.data.package_name}'`);
      }else if (error.response && error.response.data && error.response.data.image) {
        toast.error(`Image validation error: ${error.response.data.image.join(', ')}`)
      }else{
        toast.error(`An error occurred during adding package: ${error.message}`)
      }  
    }
  }

  return (
    <div className='addpackage-container'>
      <h2 className="heading">Add Package</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className='label'>
          Package Name:
          <input
            className='input'
            type="text"
            name="package_name"
            value={formData.package_name}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Duration:
          <input
            className='input'
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Price:
          <input
            className='input'
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Sale Price:
          <input
            className='input'
            type="text"
            name="sale_price"
            value={formData.sale_price}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Overview:
          <textarea
            className='textarea'
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Category:
          <select
            className='select'
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            {categories
            .filter(category => category.is_available)
            .map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
        </label>
        <label className="label">
          Continent:
          <select
            className="select"
            name="continent"
            value={formData.continent}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a continent</option>
            {continent.map((contin) => (
              <option key={contin.id} value={contin.id}>
                {contin.continent_name}
              </option>
            ))}
          </select>
        </label>
        <label className='label'>
          Image:
          <input className='input' type="file" name="image" onChange={handleImageChange} />
        </label>
        <label className='label'>
          City:
          <input
            className='input'
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Country:
          <input
            className='input'
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </label>

        <label className='label'>
          Rating:
          <input
            className='input'
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Is Active:
          <div className='checkbox-wrapper'>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleCheckboxChange}
            />
          </div>  
        </label>

        <label className="label">
          Inclusions:
          <select
            className="select"
            name="inclusions"
            multiple
            value={formData.inclusions}
            onChange={handleMultiSelectChange}
          >
            {inclusions.map((inclusion) => (
              <option key={inclusion.id} value={inclusion.id}>
                {inclusion.inclusion}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Exclusions:
          <select
            className="select"
            name="exclusions"
            multiple
            value={formData.exclusions}
            onChange={handleMultiSelectChange}
          >
            {exclusions.map((exclusion) => (
              <option key={exclusion.id} value={exclusion.id}>
                {exclusion.exclusion}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Hotels:
          <select
            className="select"
            name="hotels"
            multiple
            value={formData.hotels}
            onChange={handleMultiSelectChange}
          >
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.hotel_name}
              </option>
            ))}
          </select>
        </label>

        <button className='button' type="submit">Add Package</button>
      </form>
    </div>
  )
}

export default AddPackageForm
