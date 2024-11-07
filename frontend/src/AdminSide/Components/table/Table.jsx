import React, { useEffect, useState } from 'react'
import './table.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminAxios } from '../../../axios_instances/Axios_instance';



const List = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async() =>{
      try {
        const responce = await AdminAxios.get('api/admin/bookings')
        setBookings(responce.data)
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }
    }
    fetchBookings()
  },[])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Package</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">StartDate</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="tableCell">{booking.booking_number}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={booking.package_details.image} alt="" className="image" />
                  {booking.package_name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{booking.full_name}</TableCell>
              <TableCell className="tableCell">{booking.start_date}</TableCell>
              <TableCell className="tableCell">{booking.total}</TableCell>
              <TableCell className="tableCell">{booking.payment_method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${booking.booking_status}`}>{booking.booking_status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
