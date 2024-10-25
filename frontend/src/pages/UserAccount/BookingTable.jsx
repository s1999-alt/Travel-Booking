import React, { useContext, useEffect, useState } from 'react';
import './booking-table.css'; 
import { Link } from 'react-router-dom';
import { UserAxios } from '../../axios_instances/Axios_instance';
import UserContext from '../../context/UserContext';

const BookingTable = () => {
  const {userInfo, updateUserInfo} = useContext(UserContext)
  const [bookings, setBookings] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect( () => {
    const fetchBookingDetails = async ()=> {
      console.log('------------------------', userInfo.user_id)
      try {
        if(userInfo && userInfo.user_id){
          const response = await UserAxios.get(`api/user/bookings/${userInfo.user_id}/`)
          setBookings(response.data)
        }else{
          console.log('User info is not available.');
        }  
      } catch (error) {
        console.log('Error fetching booking data:', error);
      }
    }
    fetchBookingDetails()
  },[userInfo])

  const filteredBookings = bookings.filter(booking => 
    booking.package_details.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="booking-table-container">
      <input
        type="text"
        placeholder="Search by package name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="booking-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Booking No</th>
            <th>Package Name</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking, index) => (
            <tr key={index}>
              <td>{indexOfFirstBooking + index + 1}</td>
              <td>{booking.booking_number}</td>
              <td>{booking.package_details.package_name}</td>
              <td>₹{booking.total}</td>
              <td>
                {/* Use a button with appropriate styling for the "Track" action */}
                <button className="track-button">
                  <Link to={`/userAccount/bookings/${booking.id}`} style={{color:'white'}}>show</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {/* Previous button */}
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {/* Page numbers */}
        {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : null}>
            {index + 1}
          </button>
        ))}
        {/* Next button */}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(bookings.length / bookingsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};
export default BookingTable;