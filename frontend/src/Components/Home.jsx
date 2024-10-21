import React from 'react'
import Nav from './Nav/Nav'
import Header from './Header/Header'
import Memories from './Memories/Memories'
import Trips from './Trips/Trips'
import Search from './Searches/Search'
import About from './About/About'
import Testimonial from './Testimonial/Testimonial'
import Destinations from './Destinations/Destinations'
import CallToAction from './Footer/CallToAction'
import Footer from './Footer/Footer'

const Home = () => {
  return (
    <>
      <div className="App">
        <Nav/>
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
      <Footer/>
    </>
  )
}

export default Home
