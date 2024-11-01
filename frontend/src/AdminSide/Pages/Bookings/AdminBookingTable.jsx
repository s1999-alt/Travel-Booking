import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../axios_instances/Axios_instance'
import { Link } from 'react-router-dom'
import './admin-booking-table.css'



const AdminBookingTable = () => {
  const [bookings, setBookings] = useState([])

  useEffect( () =>{
    const fetchBooking = async() =>{
      try {
        const response = await AdminAxios.get(`api/admin/bookings/`)
        setBookings(response.data)
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }
    }
    fetchBooking()
  },[])

  return (
    <div className="booking-table-container">
      <h1>Booking Details</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking Number</th>
            <th>Traveller Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Package</th>
            <th>No of Guests</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Status</th>
            <th>Payment Method</th>
            <th>Booking Status</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.booking_number}</td>
              <td>{booking.full_name}</td>
              <td>{booking.phone}</td>
              <td>{booking.email}</td>
              <td>{booking.package_details.package_name}</td>
              <td>{booking.no_of_guest}</td>
              <td>{booking.start_date}</td>
              <td>{booking.end_date}</td>
              <td>{booking.status}</td>
              <td>{booking.payment_method}</td>
              <td>{booking.booking_status}</td>
              <td>{booking.total}</td>
              <td>
                <button>
                  <Link to={`/admin/admin-booking-details/${booking.id}`} style={{color:'white'}}>show</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminBookingTable
