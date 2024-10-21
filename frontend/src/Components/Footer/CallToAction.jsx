import React from 'react'
import calltoactionCSS from '../Footer/CallToAction.module.css'

const CallToAction = () => {
  return (
    <div className={`${calltoactionCSS.CallToAction_Wrapper} section`}>
      <h3>Explore Iconic Popular Destination <br />
          With Expert Insides
      </h3>
      <button className={calltoactionCSS.book_adventure_button}>Book Adventure</button>
    </div>
  )
}

export default CallToAction
