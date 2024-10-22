import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import navCSS from './../Nav/Nav.module.css'

const Nav = () => {
  
  const navigate = useNavigate()
  const menu = useRef()

  const MenuHandler = () =>{
    menu.current.classList.toggle(navCSS.activeMenu)
  }

  return (
    <div className={navCSS.Nav_wrapper}>
      <div className={navCSS.logo}>
        <a href="#">TripTrails <span>.</span></a>
      </div>

      <ul ref={menu}>
        <li><a href=""><NavLink to="/">Home</NavLink></a></li>
        <li><a href=""><NavLink to="/">Trips</NavLink></a></li>
        <li><a href=""><NavLink to="/">Destinations</NavLink></a></li>
        <li><a href=""><NavLink to="/">Searches</NavLink></a></li>
        <li><a href=""><NavLink to="/">About</NavLink></a></li>
      </ul>

      <div className={navCSS.nav_btns}>
        <div className={navCSS.search_wrapper}>
          <i className="ri-search-line"></i>
          <input type="text" placeholder='Search Places'/>
        </div>
        
        <div className={navCSS.auth_wrapper}>
          <NavLink to="/login" className={navCSS.auth_link}>Login</NavLink>
          <span>|</span>
          <NavLink to="/register/" className={navCSS.auth_link}>Register</NavLink>
        </div>
        
        <i className='ri-menu-2-line' onClick={MenuHandler} id={navCSS.bars}></i>
      </div>

    </div>
  )
}

export default Nav
