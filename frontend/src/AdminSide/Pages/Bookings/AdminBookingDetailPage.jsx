import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaCreditCard } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { AdminAxios } from '../../../axios_instances/Axios_instance';
import './admin-booking-detail-page.css';

Modal.setAppElement('#root');

const AdminBookingDetailPage = () => {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [walletAmount, setWalletAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await AdminAxios.get(`api/admin/bookings/${id}/`);
        setBookingDetails(response.data);
      } catch (error) {
        console.log('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id]);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (bookingDetails && bookingDetails.user) {
        try {
          const response = await AdminAxios.get(`api/admin/wallet/${bookingDetails.user}/`);
          setWalletAmount(response.data.balance);
        } catch (error) {
          console.log('Error fetching wallet balance:', error);
        }
      }
    };

    fetchWalletBalance();
  }, [bookingDetails]);


  const handleCancelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      await AdminAxios.put(`api/admin/bookings/${id}/`, {
        status: 'Returned',
        booking_status: 'Cancelled by TripTrails',
      });

      const newWalletBalance = parseFloat(walletAmount) + parseFloat(bookingDetails.total);
      await AdminAxios.patch(`api/admin/wallet/${bookingDetails.user}/`, {
        balance: newWalletBalance,
      });
      setWalletAmount(newWalletBalance);
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        booking_status: 'Cancelled by TripTrails', // Update booking status here
      }));
      setShowModal(false);
      toast.success('Booking cancelled and the amount is refunded into user wallet');
      navigate('/admin/booking-table/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!bookingDetails) return <div>No booking details available.</div>;

  return (
    <div className="booking-detail-container">
      <div className="booking-section">
        <h2>Booking ID: {bookingDetails.booking_number}</h2>
        <p>Booking Status: {bookingDetails.booking_status}</p>
        <hr />
      </div>
      <div className="booking-section">
        <div className="left-section">
          <h3>Traveler Details</h3>
          <p><FaUser /> Traveler Name: {bookingDetails.full_name}</p>
          <p><FaPhone /> Phone: {bookingDetails.phone}</p>
          <p><FaEnvelope /> Email: {bookingDetails.email}</p>
        </div>
        <div className="right-section">
          <h3>Booking Details</h3>
          <p><FaMapMarkerAlt /> Package Name: {bookingDetails.package_details.package_name}</p>
          <p><FaCalendarAlt /> Starting Date: {bookingDetails.start_date}</p>
          <p><FaCalendarAlt /> Ending Date: {bookingDetails.end_date}</p>
          <p><FaUser /> No of Guests: {bookingDetails.no_of_guest}</p>
          <hr />
        </div>
      </div>
      <div className="booking-section">
        <h3>Payment</h3>
        <p><FaCreditCard style={{ color: 'green' }} /> Payment Method: {bookingDetails.payment_method}</p>
        <p><FaCreditCard style={{ color: 'green' }} /> Payment Status: {bookingDetails.status}</p>
        <p>Wallet Paid: ₹ {bookingDetails.wallet_paid}</p>
        <p>Additional Amount: ₹ 0 /-</p>
        <p>Total Paid: ₹ {bookingDetails.total} /-</p>
        <hr />
      </div>
      <div className="booking-section">
        <div className="left-section">
          <img src={bookingDetails.package_details.image} alt="Package" />
        </div>
        <div className="right-section">
          <h3>Package Details</h3>
          <p>Package Name: {bookingDetails.package_details.package_name}</p>
          <p><FaCalendarAlt /> Duration: {bookingDetails.package_details.duration} days</p>
          <p><FaUser /> No of Persons: {bookingDetails.no_of_guest}</p>
          <p><FaMapMarkerAlt /> Places: {bookingDetails.package_details.city}</p>
          <p><FaRupeeSign /> Rate: ₹ {bookingDetails.package_details.price} /per person</p>
        </div>
      </div>
      <button
        className="cancel-booking-button"
        onClick={() => setShowModal(true)}
        disabled={bookingDetails.booking_status === 'Cancelled' || bookingDetails.booking_status === 'Cancelled by TripTrails'}
      >
        {bookingDetails.booking_status === 'Cancelled' || bookingDetails.booking_status === 'Cancelled by TripTrails' ? 'Booking Cancelled' : 'Cancel Booking'}
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        contentLabel="Cancel Booking Modal"
      >
        <h2>Are you sure you want to cancel this booking?</h2>
        <button onClick={handleCancelBooking} disabled={loading}>Yes</button>
        <button onClick={() => setShowModal(false)} disabled={loading}>No</button>
        {error && <p className="error-message">{error}</p>}
      </Modal>
    </div>
  );
};

export default AdminBookingDetailPage;
