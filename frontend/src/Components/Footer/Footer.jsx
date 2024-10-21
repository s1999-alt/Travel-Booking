import React from 'react'
import footerCSS from '../Footer/Footer.module.css'

const Footer = () => {
  return (
    <div className={`${footerCSS.Footer_Wrapper} section`}>
      <div className={footerCSS.top_container}>
        <div className={footerCSS.logo}>
          <a href="#">TripTrails</a>
        </div>
        <div className={footerCSS.social}>
          <i className="ri-facebook-line"></i>
          <i className="ri-instagram-line"></i>
          <i className="ri-twitter-x-line"></i>
          <i className="ri-youtube-line"></i>
        </div>
      </div>
      <div className={footerCSS.bottom_container}>
        <div className={footerCSS.footerLinks}>
          <h5>About</h5>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our History</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Destination</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className={footerCSS.footerLinks}>
          <h5>Destinations</h5>
          <ul>
            <li><a href="#">USA</a></li>
            <li><a href="#">Latin America</a></li>
            <li><a href="#">Asia</a></li>
            <li><a href="#">Europe</a></li>
            <li><a href="#">Africa</a></li>
          </ul>
        </div>
        <div className={footerCSS.footerLinks}>
          <h5>Support</h5>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Request a Quote</a></li>
            <li><a href="#">Booking Conditions</a></li>
            <li><a href="#">Recommendations</a></li>
          </ul>
        </div>
        <div className={footerCSS.footerLinks}>
          <h5>Our NewsLetter</h5>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ab.</p>

          <div className={footerCSS.inputWrapper}>
            <input type="email" placeholder='Enter Your Email'/>
            <button className={footerCSS.inputWrapper_button}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
