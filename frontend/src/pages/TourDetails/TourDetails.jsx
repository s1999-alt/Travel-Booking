import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col} from 'reactstrap'
import  './TourDetails.css'
import { useParams } from 'react-router-dom';

import threestar from '../../assets/3-star.gif'
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiOutlineArrowLeft} from "react-icons/hi";
import { UserAxios } from '../../axios_instances/Axios_instance';



const TourDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [itinararies, setItinararies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await UserAxios.get(`api/user/packages/${id}`);
        setPackageDetails(responce.data);

        const itinararyResponse = await UserAxios.get(`api/user/itinararies/?package=${id}`)
        setItinararies(itinararyResponse.data)
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!packageDetails) {
    return <div>Loading...</div>; 
  }

  const {
    package_name,
    duration,
    price,
    sale_price,
    overview,
    category,
    continent,
    image,
    images,
    city,
    country,
    rating,
    inclusions,
    exclusions,
    hotels,
    is_active,
  } = packageDetails;

  const Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // set the interval for automatic image change (in milliseconds)
  };

  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow next-arrow" onClick={onClick}>
      <HiOutlineArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-arrow prev-arrow" onClick={onClick}>
      <HiOutlineArrowLeft />
    </div>
  );

  return (
    <>
      <section style={{ marginTop: '140px' }}>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <Slider {...Settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
                  {images.map((img, index) => (
                    <div key={index}>
                      <img
                        style={{ width: '100%', height: '21rem' }}
                        src={img.image}
                        alt={`Slide ${index}`}
                      />
                    </div>
                  ))}
                </Slider>

                <div className="tour__info">
                  <h2 style={{ display: 'inline-block', marginRight: '8px' }}>{package_name}</h2>
                  <p style={{ display: 'inline-block', fontSize: 'medium' }}>{duration} days</p>
                  <span className="landonly" style={{ display: 'inline-block', fontSize: 'medium', marginLeft: '8px' }}>Land Only</span>
                  <div className="d-flex align-items-center gap-5">
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: '#faa935' }}></i>{rating}{" "}
                    </span>
                    <span>
                      <i className="ri-map-pin-fill"></i>{city}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="ri-money-rupee-circle-line"></i>{sale_price} / per person</span>
                    <span><i className="ri-group-line"></i>17(maximum)</span>
                  </div>
                  <h5>Description</h5>
                  <p>{overview}</p>
                </div>

                <div className="container mgt15">
                  <div className="main-lef-bx">
                    <h3>Inclusions</h3>
                    <ul>
                      {inclusions.map((item, index) => (
                        <li key={index} className="ng-binding ng-scope">{item.inclusion}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="main-rig-bx">
                    <h3>Excluisons</h3>
                    <ul>
                      {exclusions.map((item, index) => (
                        <li key={index} className="ng-binding ng-scope">{item.exclusion}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="test2 tracked">
                  <div className="boxv1 mgt15">
                    <div className="container">
                      <div className="hotel-heading">
                        Hotel Details
                      </div>
                      <div className="container mgt15">
                        {hotels.map((hotel, index) => (
                          <div key={index} className="main-holid-new ng-scope">
                            <div className="in-hot-img">
                              <img src={hotel.hotel_image} alt={hotel.hotel_name} />
                            </div>
                            <div className="in-hot-cane">
                              <div className="hed-holid">
                                <h3 className="ng-binding">{hotel.hotel_name}</h3>
                              </div>
                              <div className="hol-str-ico">
                                <img src={threestar} alt="" />
                              </div>
                              <div className="clr"></div>
                              <span>
                                <i className="ri-map-pin-fill"></i>{hotel.place}
                              </span>
                              <div className="holi-can-holiy">
                                <p className="ng-binding">{hotel.hotel_overview}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="test3 tracked">
                  <div className="boxv1 mgt15">
                    <div className="container">
                      <div className="hotel-heading">
                        Day Wise Itinerary
                      </div>
                      <div className="container2 mgt15 ng-scope">
                        {itinararies.map((itinarary, index) => (
                          <div key={index}>
                            <h4 className="ng-binding">{`Day ${itinarary.day_number}`}</h4>
                            <div className="item">
                              <div id="timeline">
                                <div>
                                  <section className="year ng-scope" style={{ padding: '0px' }}>
                                    <section className="mtags" style={{ padding: '0px' }}>
                                      <div className></div>
                                      <ul>
                                        <li className="dspn ng-binding ng-scope">{itinarary.activities}</li>
                                      </ul>
                                    </section>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Col>

            <Col lg="4">
              {/* <Booking packageDetails={packageDetails}/> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TourDetails;

