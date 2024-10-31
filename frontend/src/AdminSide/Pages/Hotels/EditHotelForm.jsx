import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AdminAxios } from '../../../axios_instances/Axios_instance';
import { toast } from 'react-toastify';
import './edit-hotel-form.css'



const EditHotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    hotel_name: '',
    place: '',
    hotel_overview: '',
    hotel_image: null,
    is_available: true,
  });

  const [imageURL, setImageURL] = useState('');
  const [fileInput, setFileInput] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await AdminAxios.get(`api/admin/hotels/update/${id}/`);
        const{hotel_name, place, hotel_overview, hotel_image, is_available} = response.data
        setFormData({
          hotel_name,
          place,
          hotel_overview,
          is_available,
        });
        setImageURL(hotel_image)
      } catch (error) {
        console.log('Error fetching hotel details', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileInput(selectedFile)
    setImageURL(selectedFile? selectedFile.name : '')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = new FormData();
    for (const key in formData) {
      hotelData.append(key, formData[key]);
    }

    if (fileInput) {
      hotelData.append('image', fileInput);
    }

    try {
      await AdminAxios.put(`api/admin/hotels/update/${id}/`, hotelData);
      navigate('/admin/hotels-list/')
      toast.success('Hotel updated successfully');
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error(`An error occurred during hotel update: ${error.message}`);
    }
  };

  return (
    <div className='edit-hotel-container'>
      <div className='box-container'>
        <h2>Edit Hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <label>
              Hotel Name:
              <input type='text' name='hotel_name' value={formData.hotel_name} onChange={handleInputChange} required />
            </label>
            <label>
              Place:
              <input type='text' name='place' value={formData.place} onChange={handleInputChange} required />
            </label>
          </div>
          <div className='form-row'>
            <label>
              Hotel Overview:
              <textarea name='hotel_overview' value={formData.hotel_overview} onChange={handleInputChange} required />
            </label>
          </div>
          <div className='form-row'>
            <label>
              Hotel Image:
              <input className='input' value={imageURL} type='text' name='hotel_image' readOnly/>
              {imageURL && <img src={imageURL} style={{maxWidth:'20%',marginLeft:'15px',marginBottom:'10px',marginTop:'10px'}} alt='hotel-image Preview' />}
            </label>
            <label>
             Choose New Image:
              <input className='input' type='file' accept='image/*' name='hotel_image' onChange={handleImageChange} />
            </label>
          </div>
          <div className='form-row'>
            <label>
              Is Available:
              <input
              style={{width:'20px'}}
                type='checkbox'
                name='is_available'
                checked={formData.is_available}
                onChange={() => setFormData({ ...formData, is_available: !formData.is_available })}
              />
            </label>
          </div>
          <button type='submit'>Update Hotel</button>
        </form>
      </div>
    </div>
  )
}

export default EditHotelForm
