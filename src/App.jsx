import React, { useState } from 'react'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="background">
        <MainTimer />
        <Buttons />
        <Laps />
      </div>
    </div>
  )
}

const MainTimer = () => {
  return (
    <div className="main-timer-box">
      <h1>00:00.00</h1>
    </div>
  )
}

const Buttons = () => {
  return (
    <div className="button-box">
      <button className="reset-lap-button"><p>Reset</p></button>
      <button className="start-stop-button button--start-color"><p>Start</p></button>
    </div>
  )
}

const Laps = () => {
  return (
    <div className="laps-box">

    </div>
  )
}


export default App
