import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import { UserAxios } from '../../axios_instances/Axios_instance';
import './booking.css';

const Booking = ({ packageDetails }) => {
  const {userInfo, updateUserInfo} = useContext(UserContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    start_date: '',
    no_of_guest: '',
  });

  useEffect(()=>{
  },[formData,packageDetails])

  const serviceCharge = 100;
  const packageAmount = packageDetails.sale_price * Number(formData.no_of_guest);
  const rawtaxAmount = 0.1 * packageAmount;
  const taxAmount = parseFloat(rawtaxAmount.toFixed(2));
  const grandTotal = packageAmount + taxAmount + serviceCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && (!/^[1-9][0-9]{0,9}$/.test(value))) {
      toast.error('Invalid phone number. Please enter a valid positive number.');
      return;
    }
    setFormData({ ...formData, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, phone, email, start_date, no_of_guest } = formData;

    if (!full_name || !phone || !email || !start_date || !no_of_guest) {
      toast.error('All fields are required');
      return;
    }

    if (!/^\d+$/.test(no_of_guest)) {
      toast.error('Number of guests should contain only numeric values');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    if (!/^[1-9][0-9]{9}$/.test(phone)) {
      toast.error('Invalid phone number. Please enter a valid 10-digit number.');
      return;
    }

    try {
      const response = await UserAxios.post('/api/user/bookings/', {
        ...formData,
        package: packageDetails.id,
        user: userInfo.user_id,
        total: grandTotal,
      });
      const bookingId = response.data.id;
      navigate(`/bookingConfirm/${bookingId}`);
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error during booking:', error);
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="booking-container">
      {/* Top Section: Price and Rating */}
      <div className="booking-header d-flex justify-content-between align-items-center mb-4">
        <h3 className="price">
          <FaRupeeSign className="rupee-icon" /> {packageDetails.sale_price}
          <span className="per-person">/per person</span>
        </h3>
        <div className="rating d-flex align-items-center">
          <i className="ri-star-fill star-icon"></i>
          <span>{packageDetails.rating}</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="booking-form">
        <h5 className="form-title">Information</h5>
        <Form className="info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              name="full_name"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex gap-2">
            <input
              type="date"
              name="start_date"
              min={today}
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="No of Guests"
              name="no_of_guest"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Price Breakdown */}
      <div className="booking-summary">
        <ListGroup>
          <ListGroupItem className="summary-item d-flex justify-content-between">
            <h5>
              <FaRupeeSign className="rupee-icon" /> {packageDetails.sale_price} x {formData.no_of_guest || 1} person(s)
            </h5>
            <span>
              <FaRupeeSign className="rupee-icon" /> {packageAmount}
            </span>
          </ListGroupItem>

          <ListGroupItem className="summary-item d-flex justify-content-between">
            <h5>Service Charge</h5>
            <span>
              <FaRupeeSign className="rupee-icon" /> {serviceCharge}
            </span>
          </ListGroupItem>

          <ListGroupItem className="summary-item d-flex justify-content-between">
            <h5>Tax</h5>
            <span>
              <FaRupeeSign className="rupee-icon" /> {taxAmount}
            </span>
          </ListGroupItem>

          <ListGroupItem className="summary-item total d-flex justify-content-between">
            <h5>Grand Total</h5>
            <span>
              <FaRupeeSign className="rupee-icon" /> {grandTotal}
            </span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary-btn w-100 mt-4" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;

