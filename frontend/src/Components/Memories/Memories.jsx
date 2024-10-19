import React from 'react'
import memoriesCSS from './../Memories/Memories.module.css'

import MemoriesImg1 from '../../assets/travelport1.jpg'
import MemoriesImg2 from '../../assets/travelport2.jpg'
import MemoriesImg3 from '../../assets/travelport3.jpg'
import MemoriesImg4 from '../../assets/travelport4.jpg'
import MemoriesImg5 from '../../assets/travelport5.jpg'
import MemoriesImg6 from '../../assets/travelport6.jpg'
import MemoriesImg7 from '../../assets/travelport7.jpg'

const Memories = () => {
  return (
    <div className={`${ memoriesCSS.Memories_wrapper} section`}>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg1} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Small Groups Departures</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg2} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Affordable Dreams</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg3} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Undiscovers Tours</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg4} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Let Our Experts Plan <br /> Your 2024 Tours</h6>
          <button className={memoriesCSS.memoriesbtn}>View Tours</button>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg5} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Religious Tours</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg6} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Solo Travel</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
      <div className={memoriesCSS.MemoriesCard}>
        <img src={MemoriesImg7} alt="Memories-img" />

        <div className={memoriesCSS.content}>
          <h6>Private Touring</h6>
          <a href="#">View Tours</a>
        </div>
      </div>
    </div>
  )
}

export default Memories
