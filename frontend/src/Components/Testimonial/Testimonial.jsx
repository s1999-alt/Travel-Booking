import React from 'react'
import testimonialCSS from '../Testimonial/Testimonial.module.css'
import profile1 from '../../assets/Testimonials-02.jpg'
import profile2 from '../../assets/Testimonials-03.jpg'
import profile3 from '../../assets/Testimonials-07.jpg'

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Autoplay} from 'swiper/modules'

const Testimonial = () => {
  return (
    <div className={`${testimonialCSS.Testimonial_Wrapper} section`}>
      <h4>Exceptional Journey's With TripTrails. </h4>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        breakpoints={{
          0:{
             slidesPerView:1
          },
          768:{
            slidesPerView:2
          },
          1200:{

          }
        }}
        autoplay={{
          delay:1500,
        }}
        modules={[Autoplay]}
      className={testimonialCSS.swiper}>
        <SwiperSlide>
          <div className={testimonialCSS.Testimonial_Container}>
            <div className={testimonialCSS.profile}>
              <img src={profile1} alt="" />
              <div className={testimonialCSS.detail}>
                <span>
                  John Doe
                </span>
                <div className={testimonialCSS.ratings}>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-half-fill'></i>
                </div>
              </div>
            </div>
            <p>"This trip was beyond our expectations! From the breathtaking views to the well-organized itinerary, everything was perfect. We can't wait for our next adventure with you!"</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={testimonialCSS.Testimonial_Container}>
            <div className={testimonialCSS.profile}>
              <img src={profile2} alt="" />
              <div className={testimonialCSS.detail}>
                <span>
                  Zam
                </span>
                <div className={testimonialCSS.ratings}>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-half-fill'></i>
                </div>
              </div>
            </div>
            <p>"This trip was beyond our expectations! From the breathtaking views to the well-organized itinerary, everything was perfect. We can't wait for our next adventure with you!"</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={testimonialCSS.Testimonial_Container}>
            <div className={testimonialCSS.profile}>
              <img src={profile3} alt="" />
              <div className={testimonialCSS.detail}>
                <span>
                  Adam
                </span>
                <div className={testimonialCSS.ratings}>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-half-fill'></i>
                </div>
              </div>
            </div>
            <p>"This trip was beyond our expectations! From the breathtaking views to the well-organized itinerary, everything was perfect. We can't wait for our next adventure with you!"</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={testimonialCSS.Testimonial_Container}>
            <div className={testimonialCSS.profile}>
              <img src={profile2} alt="" />
              <div className={testimonialCSS.detail}>
                <span>
                  Benna
                </span>
                <div className={testimonialCSS.ratings}>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-fill'></i>
                  <i className='ri-star-half-fill'></i>
                </div>
              </div>
            </div>
            <p>"This trip was beyond our expectations! From the breathtaking views to the well-organized itinerary, everything was perfect. We can't wait for our next adventure with you!"</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Testimonial
