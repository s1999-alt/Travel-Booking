import React from 'react'
import Nav from './Nav/Nav'
import Header from './Header/Header'
import Memories from './Memories/Memories'
import Trips from './Trips/Trips'
import Search from './Searches/Search'
import About from './About/About'

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
    </>
  )
}

export default Home
