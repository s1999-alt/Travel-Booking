import React, { useContext, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import navCSS from './../Nav/Nav.module.css'
import UserContext from '../../context/UserContext'
import { RiUser3Line } from 'react-icons/ri'

const Nav = () => {
  const {userInfo, updateUserInfo} = useContext(UserContext)
  
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
        
        {userInfo.username ? (
          <div className={navCSS.account_wrapper}>
            {/* Hii {userInfo.username}! */}
            <Link to='/account' className={navCSS.account_link}><RiUser3Line size={23} /></Link>
            <Link to='/logout/'>Logout</Link>
          </div>
        ):(
          <div className={navCSS.auth_wrapper}>
            <NavLink to="/login/" className={navCSS.auth_link}>Login</NavLink>
            <span>|</span>
            <NavLink to="/register/" className={navCSS.auth_link}>Register</NavLink>
          </div>
        )}
        
        <i className='ri-menu-2-line' onClick={MenuHandler} id={navCSS.bars}></i>
      </div>

    </div>
  )
}

export default Nav
