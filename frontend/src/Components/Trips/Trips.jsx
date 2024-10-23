import React, { useEffect, useState } from 'react'
import TripsCSS from '../Trips/Trips.module.css'
import trip01 from '../../assets/Trips01.jpg'
import { UserAxios } from '../../axios_instances/Axios_instance'
import { Link } from 'react-router-dom'



const Trips = () => {
  const [packages, setPackages] = useState([])

  useEffect(()=> {
    const fetchData = async() =>{
      try {
        const responce = await UserAxios.get('api/user/packages/')
        setPackages(responce.data)
      } catch (error) {
        console.error('Error fetching package details:', error)
      }
    }
    console.log(packages)
    fetchData()
  },[])


  return (
    <div className={`${TripsCSS.trips_wrapper} section`}>
      <h3>Popular Trips</h3>
      <div className={TripsCSS.cards}>
        {packages.length > 0 ? (
          packages.map((pack) => (
            <div className={TripsCSS.card} key={pack.id}>
              <img src={trip01} alt="" />
              <div className={TripsCSS.TripContent}>
                <div className={TripsCSS.rating}>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-half-fill'></i>
                </div>

                <h5>{pack.package_name}</h5>

                <div className={TripsCSS.TripDetails}>
                  <span><i className='ri-calendar-line'></i>{pack.duration}</span>
                  <span><i className='ri-map-pin-line'></i> 5 places</span>
                  <span><i className='ri-flag-line'></i>{pack.country}</span>
                </div>

                <div className={TripsCSS.pricing}>
                  <span className={TripsCSS.price}> ₹{pack.sale_price}</span>
                  <button className={TripsCSS.book}>
                    <Link to={`/packages/${pack.id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          ))  
        ) : (
          <p>No trips available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default Trips
