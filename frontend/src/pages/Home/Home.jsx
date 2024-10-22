import React from 'react'
import Header from '../../Components/Header/Header'
import Memories from '../../Components/Memories/Memories'
import Trips from '../../Components/Trips/Trips'
import Search from '../../Components/Searches/Search'
import About from '../../Components/About/About'
import Testimonial from '../../Components/Testimonial/Testimonial'
import Destinations from '../../Components/Destinations/Destinations'
import CallToAction from '../../Components/Footer/CallToAction'

const Home = () => {
  return (
    <>
      <div className="App">
        <Header/>
        <Memories/>
      </div>
      <Trips/>
      <Search/>
      <div className="App">
        <About/>
      </div>
      <Testimonial/>
      <Destinations/>
      <div className="App">
        <CallToAction/>
      </div>
    </>
  )
}

export default Home
