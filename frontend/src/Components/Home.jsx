import React from 'react'
import Header from './Header/Header'
import Memories from './Memories/Memories'
import Trips from './Trips/Trips'
import Search from './Searches/Search'
import About from './About/About'
import Testimonial from './Testimonial/Testimonial'
import Destinations from './Destinations/Destinations'
import CallToAction from './Footer/CallToAction'

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
