import React from 'react'
import searchCSS from '../Searches/Search.module.css'

const Search = () => {
  return (
    <div className={`${searchCSS.search_wrapper} section`}>
      <h4>Popular Searches</h4>

      <div className={searchCSS.Cards}>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Domestic Trips <span> See America In a New Light </span></h5>
        </div>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Vacations in 14 Days <span> Limited Availabilility and Selling Fast </span></h5>
        </div>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Offer for Travelling Groups <span> Save When you 9+ Guests </span></h5>
        </div>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Past Guest Benefits <span> Saving With Global Tour Rewards </span></h5>
        </div>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Tours Under ₹20000  <span> Browse Our Value Vacations</span></h5>
        </div>
        <div className={searchCSS.card}>
          <i className='ri-search-line'></i>

          <h5> Tours Under ₹20000  <span> Browse Our Value Vacations</span></h5>
        </div>
      </div>
    </div>
  )
}

export default Search
