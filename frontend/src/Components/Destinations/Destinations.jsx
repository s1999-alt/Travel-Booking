import React from 'react'
import destinationsCSS from '../Destinations/Destinations.module.css'

import destination01 from '../../assets/Destination01.jpg'
import destination02 from '../../assets/Destination02.jpg'
import destination03 from '../../assets/Destination03.jpg'
import destination04 from '../../assets/Destination04.jpg'
import destination05 from '../../assets/Destination05.jpg'
import destination06 from '../../assets/Destination06.jpg'

const Destinations = () => {
  return (
    <div className={`${destinationsCSS.Destinations_Wrapper} section`}>
      <h4>Popular Destinations</h4>

      <div className={destinationsCSS.DestinationCards}>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination01} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>Europe</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination02} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>Asia</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination03} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>North America</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination04} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>Latin America</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination05} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>Australia</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
        <div className={destinationsCSS.DestinationCard}>
          <img src={destination06} alt="img-destinations" />
          <div className={destinationsCSS.DestinationDetails}>
            <h5>Africa</h5>
            <div className={destinationsCSS.btns}>
              <a href="#">All Destinations</a>
              <a href="#">Deals</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Destinations
