import React from 'react'
import navCSS from './../Nav/Nav.module.css'

const Nav = () => {
  return (
    <div className={navCSS.Nav_wrapper}>
      <div className={navCSS.logo}>
        <a href="#">TripTrails <span>.</span></a>
      </div>

      <ul>
        <li><a href="">Home</a></li>
        <li><a href="">Trips</a></li>
        <li><a href="">Destinations</a></li>
        <li><a href="">Searches</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Destinations</a></li>
      </ul>

      <div className={navCSS.nav_btns}>
        <div className={navCSS.search_wrapper}>
          <i className="ri-search-line"></i>
          <input type="text" placeholder='Search Places'/>
        </div>
        <div className={navCSS.CallBtn}>
          <i className="ri-phone-line"></i>
          <p>+91 9633911996 <small>Call Travel Agent</small></p>
        </div>
        <i className='ri-menu-2-line' id={navCSS.bars}></i>
      </div>

    </div>
  )
}

export default Nav
