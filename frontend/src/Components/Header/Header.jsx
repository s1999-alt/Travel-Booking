import React from 'react'
import headerCSS from '../Header/Header.module.css'

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Autoplay} from 'swiper/modules'

import destinationImg1 from '../../assets/tour-01.png'
import destinationImg2 from '../../assets/tour-02.png'
import destinationImg3 from '../../assets/tour-03.png'
import destinationImg4 from '../../assets/tour-04.png'
import destinationImg5 from '../../assets/tour-05.png'
import destinationImg6 from '../../assets/tour-06.png'

const Header = () => {
  return (
    <div className={`${headerCSS.header_wrapper}`}>
      <div className={headerCSS.imageContainer}>
        <h2>Explore The World , <br /> One Unforgattable Journey</h2>
      </div>

      <Swiper
           
           spaceBetween={30}
           slidesPerView={5}
           loop ={true}
           autoplay={
            {
              delay: 1500,
            }
           }
           breakpoints={
            {
              0:{
                slidesPerView: 1,
              },
              500:{
                slidesPerView: 2,
              },
              768:{
                slidesPerView: 3,
              },
              1024:{
                slidesPerView: 4,
              },
              1200:{
                slidesPerView: 5,
              }
            }
           }
           modules={[Autoplay]}


       className={headerCSS.swiper}>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg2} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg3} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg4} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg5} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={headerCSS.DestinationsCard}>
            <img src={destinationImg6} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  )
}

export default Header
