import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import a14 from '../../assets/a14.png'
import a15 from '../../assets/a15.png'
import a16 from '../../assets/a16.png'
import a18 from '../../assets/a18.png'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserAxios } from '../../axios_instances/Axios_instance'
import UserContext from '../../context/UserContext'
import './booking-confirm.css'



const BookingConfirm = () => {
  const {userInfo, updateUserInfo} = useContext(UserContext)
  const {bookingId} = useParams()
  const [bookingDetails,setBookingDetails] = useState(null)
  const [useWallet, setUseWallet] = useState(false)
  const [walletAmount, setWalletAmount] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async ()=> {
      try {
        const response = await UserAxios.get(`api/user/bookings/${bookingId}`) 
        // axios.get(`http://localhost:8000/api/v1/user/bookings/${bookingId}`)
        setBookingDetails(response.data)

        if (response.data.status === 'Payment Complete') {
          toast.error('This booking has already been paid for.');
        }

      } catch (error) { 
        console.error('Error fetching booking details:', error)
      }
    }
    fetchBookingDetails()
  },[bookingId])

  useEffect(() => {
    const fetchWalletAmount = async () => {
        try {
          console.log("============================",typeof(userInfo.user_id));

          if(userInfo && userInfo.user_id) {
            console.log(userInfo.user_id);
            const response = await UserAxios.get(`api/v1/user/wallet/${userInfo.user_id}/`)
            console.log(response);
            setWalletAmount(response.data.balance);
          }
        } catch (error) {
            console.error('Error fetching wallet amount:', error);
        }
    };
    fetchWalletAmount();
  }, [userInfo]);


  
  const packageFullAmount = bookingDetails?.package_details?.sale_price * Number(bookingDetails?.no_of_guest) || 0;
  const rawtaxAmount = 0.1 * packageFullAmount
  const taxAmount = parseFloat(rawtaxAmount.toFixed(2))
  const serviceCharge = 100


  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              {bookingDetails &&(
                <div className="hotel_wrap">
                  <div className="hotel_inr_wrap">
                    <div className="breadcrum">
                      <ul>
                        <li className='ac rev ac'>1. Review and Travellers</li>
                        <li>
                          <span className='arr'></span>
                        </li>
                        <li className='rev2'>2. Payment</li>
                      </ul>
                    </div>
                    <div className="left-col-htl">
                      <div className="hotelRvw_box">
                        <form name='myform' className='ng-pristine ng-valid'>
                          <div className="rvwpanel_main">
                            <div className="rvwpanel">
                              <div className="hotelrvw-img">
                                <img src={bookingDetails.package_details.image} alt="" />
                              </div>
                              <div className="hotelrvw-info">
                                <div className="ck-cat ng-binding">Package Detail</div>
                                <h4 className='ng-binding'>{bookingDetails.package_details.package_name}</h4>
                                <div className="clr"></div>
                                <div className="hotelrvw-locatn">
                                  <span>
                                  <svg xmlns="https://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512">
                                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                  </svg>
                                  Duration: 
                                  </span>
                                  <span className='ng-binding'> {bookingDetails.package_details.duration} days </span>
                                </div>
                                <div className="wid-100 hotelrvw-locatn">
                                  <span>
                                  <svg xmlns="https://www.w3.org/2000/svg"
                                  class="bi bi-people-fill" viewBox="0 0 16 16"> 
                                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
                                  <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/> 
                                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/> 
                                  </svg>
                                  No. of Persons :
                                  </span>
                                  <span className='ng-binding'> {bookingDetails.no_of_guest} </span>
                                </div>
                                <div className="hotelrvw-locatn">
                                  <div className="wxidth ng-scope">
                                    <span>
                                      <svg xmlns="https://www.w3.org/2000/svg"
                                      class="bi bi-calendar3" 
                                      viewBox="0 0 16 16"> 
                                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/> 
                                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> 
                                      </svg>
                                    </span>
                                    <span className='ng-binding'>Start Date : {bookingDetails.start_date}</span>
                                  </div>
                                  <div className="wxidth ng-scope">
                                    <span>
                                      <svg xmlns="https://www.w3.org/2000/svg"
                                      class="bi bi-calendar3" 
                                      viewBox="0 0 16 16"> 
                                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/> 
                                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> 
                                      </svg>
                                    </span>
                                    <span className='ng-binding'>End Date : {bookingDetails.end_date}</span>
                                  </div>
                                </div>
                                <div className="clr"></div>
                                <div className="trav-ami">
                                  <ul>
                                    <li className='ng-scope'>
                                      <span>
                                        <img src={a14} alt="" />
                                      </span>
                                      <span>
                                        <img src={a15} alt="" />
                                      </span>
                                      <span>
                                        <img src={a16} alt="" />
                                      </span>
                                      <span>
                                        <img src={a18} alt="" />
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="higt_sec">
                              <div className="car-item">
                                <p className='higt-sc2'>Inclusions</p>
                                <ul>
                                {
                                  bookingDetails.package_details.inclusions.map((inclusion) =>(
                                    <li key={inclusion.id} className='ng-binding ng-scope'>
                                      {inclusion.inclusion}
                                    </li>
                                  ))
                                }
                                </ul>
                                <div className="cancl-sec">
                                  <p className='higt-sc2'>Exclusion</p>
                                  <ul>
                                    {
                                      bookingDetails.package_details.exclusions.map((exclusion) =>(
                                        <li key={exclusion.id} className='ng-binding ng-scope'>
                                          {exclusion.exclusion}
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="contn-pay-rt-main">
                    <form action='http://localhost:8000/api/v1/admin/create-checkout-session/' method='POST'>
                      <input type="hidden" name="booking_id" value={bookingId} />
                      <input type="hidden" name="user_id" value={userInfo.id} />
                      <h2>Wallet Amount: ₹{walletAmount}</h2>
                      <label className='wallet-checkbox'>
                          <input type="checkbox" name="use_wallet" checked={useWallet} onChange={(e) => setUseWallet(e.target.checked)} />
                          use wallet
                        </label>
                      <button type='submit'>Make Paym</button>
                    </form>
                  </div>
                </div>
              )}
            </Col>


            <Col lg="4">
              {bookingDetails && (
                <>
                  <div className="rate-info-box">
                    <div className="rate-info-heading">
                        <h4>Amount Details</h4>
                    </div>
                    <div className="rate-info-section">
                        <p>Persons x {bookingDetails.no_of_guest}</p>
                        <p><span>₹</span> {packageFullAmount} </p>
                    </div>
                    <div className="rate-info-section">
                        <p>Tax</p>
                        <p><span>₹</span> {taxAmount} </p>
                    </div>
                    <div className="rate-info-section">
                        <p>Service Charge</p>
                        <p><span>₹</span> {serviceCharge} </p>
                    </div>
                    <div className="rate-info-grandtotal">
                        <p><strong>Grand Total</strong></p>
                        <p><span>₹</span> {bookingDetails.total} </p>
                    </div>
                  </div>
                  <div className="rate-info-box-2">
                    <div className="rate-info-heading">
                        <h4>Booking Summary</h4>
                    </div>
                    <div className="rate-info-section-2">
                        <h5>{bookingDetails.package_details.package_name}</h5>
                        <p>from : kochi</p>
                        <p>Duration : {bookingDetails.package_details.duration} Days</p>
                    </div>
                    <div className="rate-info-section-2">
                        <p style={{fontWeight:"Bold"}}>Traveller Details</p>
                        <p style={{color:"black"}}>1. {bookingDetails.full_name} </p>
                    </div>
                    <div className="rate-info-section-2">
                        <p style={{fontWeight:"Bold"}}>Contact Details</p>
                        <p>Email : {bookingDetails.email} </p>
                        <p>Phone : {bookingDetails.phone} </p>
                    </div>
                    <div className="rate-info-grandtotal-2">
                        <p><strong>Grand Total</strong></p>
                        <p><span>₹</span> {bookingDetails.total} </p>
                    </div>
                  </div>
                  <div className="contn-pay-rt">
                    <form>
                      <button>Make Payment</button>
                    </form>
                  </div>
                </>  
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default BookingConfirm