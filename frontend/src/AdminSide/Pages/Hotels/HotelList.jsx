import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminAxios } from '../../../axios_instances/Axios_instance'



function HotelList() {
  const [hotels,setHotels] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await AdminAxios.get('api/admin/hotels/list/')
        setHotels(response.data)
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }
    fetchHotels()
  },[])

  const handleToggleAvailability = async (hotelId, isAvailable) => {
    try {
      await AdminAxios.patch(`api/admin/hotels/update/${hotelId}/`,{
        is_available: !isAvailable,
      })

      setHotels((prevHotels) => 
      prevHotels.map((hotel) =>
      hotel.id === hotelId ? {...hotel, is_available: !isAvailable} : hotel
      )
      )
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  }

  const handleEditHotel = (hotelId) => {
    navigate(`/admin/edit-hotel/${hotelId}`)
    console.log(`Edit hotel with ID: ${hotelId}`);
  }

  return (
    <div className="hotel-list-container">
      <h2>Hotel List</h2>
      <Link to="/admin/add-hotel/">
          <button className="add-packages-button">Add Hotel</button> 
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Place</th>
            <th>Overview</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>
                <img src={hotel.hotel_image} alt={hotel.hotel_name} />
              </td>
              <td>{hotel.hotel_name}</td>
              <td>{hotel.place}</td>
              <td>{hotel.hotel_overview}</td>
              <td style={{fontWeight: 'bold', color: hotel.is_available ? 'green' : 'red' }}>
                {hotel.is_available ? 'Available' : 'Unavailable'}
                </td>
              <td>
                <button onClick={() => handleToggleAvailability(hotel.id, hotel.is_available)} style={{backgroundColor:hotel.is_available ? 'red' : 'green' }}>
                  {hotel.is_available ? 'Block' : 'Unblock'}
                </button>
                <button onClick={() => handleEditHotel(hotel.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HotelList
