import React from 'react'
import aboutCSS from '../About/About.module.css'
import aboutImg from '../../assets/about-bg.png'

const About = () => {
  return (
    <div className={`${aboutCSS.about_wrapper} section`}>
      <div className={aboutCSS.about_image}>
        <img src={aboutImg} alt="" />
      </div>
      <div className={aboutCSS.about_content}>
        <h5>Discover Organized <br /> Adventures the , <br />
            Ultimate Travel Hack
        </h5>

        <p>Embark on Unforgettable Journeys, Where Every Path Leads to Discovery.</p>
        <div className={aboutCSS.about}>
          <p><i className='ri-building-4-line'></i> Accomodation</p>
          <p><i className='ri-car-line'></i> Transpotation Allowance</p>
          <p><i className='ri-magic-line'></i> Exclusive Experience</p>
          <p><i className='ri-instance-line'></i> Local Recommentations</p>
          <p><i className='ri-pin-distance-line'></i> Personalized Trip Crafting</p>
          <p><i className='ri-phone-line'></i> 27/7 Support</p>
        </div>
      </div>
    </div>
  )
}

export default About
