import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AdminAxios } from '../../../axios_instances/Axios_instance';
import { useNavigate } from 'react-router-dom';
import './add-hotel-form.css'


const AddHotelForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotel_name: '',
    place: '',
    hotel_overview: '',
    hotel_image: null,
    is_available: true,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, hotel_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = new FormData();
    for (const key in formData) {
      hotelData.append(key, formData[key]);
    }

    try {
      await AdminAxios.post('api/admin/hotels/create/', hotelData);
      navigate('/admin/hotels-list/');
      toast.success('Hotel Added Successfully');
      setFormData({
        hotel_name: '',
        place: '',
        hotel_overview: '',
        hotel_image: null,
        is_available: true,
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
      toast.error('An error occurred while adding the hotel');
    }
  };


  return (
    <div className='add-hotel-container'>
      <h2>Add Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Hotel Name:
          <input
            type='text'
            name='hotel_name'
            value={formData.hotel_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Place:
          <input
            type='text'
            name='place'
            value={formData.place}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Hotel Overview:
          <textarea
            name='hotel_overview'
            value={formData.hotel_overview}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Hotel Image:
          <input type='file' name='hotel_image' onChange={handleImageChange} />
        </label>
        <label>
          Is Available:
          <input
            type='checkbox'
            name='is_available'
            checked={formData.is_available}
            onChange={() =>
              setFormData({ ...formData, is_available: !formData.is_available })
            }
          />
        </label>
        <button type='submit'>Add Hotel</button>
      </form>
    </div>
  )
}

export default AddHotelForm
