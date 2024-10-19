import React from 'react'
import Nav from './Nav/Nav'
import Header from './Header/Header'
import Memories from './Memories/Memories'
import Trips from './Trips/Trips'
import Search from './Searches/Search'

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
    </>
  )
}

export default Home
