import React from 'react'
import TripsCSS from '../Trips/Trips.module.css'

import trip01 from '../../assets/Trips01.jpg'

const Trips = () => {
  return (
    <div className={`${TripsCSS.trips_wrapper} section`}>
      <h3>Popular Trips</h3>
      <div className={TripsCSS.cards}>

        <div className={TripsCSS.card}>
          <img src={trip01} alt="" />
          <div className={TripsCSS.TripContent}>
            <div className={TripsCSS.rating}>
              <i className='ri-star-fill'></i>
              <i className='ri-star-fill'></i>
              <i className='ri-star-fill'></i>
              <i className='ri-star-fill'></i>
              <i className='ri-star-half-fill'></i>
            </div>

            <h5>Australia Panorma</h5>

            <div className={TripsCSS.TripDetails}>
              <span><i className='ri-calendar-line'></i> 7 Days</span>
              <span><i className='ri-map-pin-line'></i> 5 places</span>
              <span><i className='ri-flag-line'></i> Australia</span>
            </div>

            <div className={TripsCSS.pricing}>
              <span className={TripsCSS.price}> ₹2,000</span>
              <button className={TripsCSS.book}>Book Now</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Trips
