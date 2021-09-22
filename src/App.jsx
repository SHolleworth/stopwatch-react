import React, { useState, useEffect } from 'react'
import './App.css'
import MainTimer from './components/MainTimer'
import Buttons from './components/Buttons'
import Laps from './components/Laps'

let mainStartTime = 0
let lapStartTime = 0
let mainSavedTime = 0
let lapSavedTime = 0
let slowestLap = -Infinity
let fastestLap = Infinity
let intervalId = 0

const App = () => {
  const [started, setStarted] = useState(false)
  const [running, setRunning] = useState(false)
  const [mainTime, setMainTime] = useState(0)
  const [lapTimes, setLapTimes] = useState([])
  const [activeLapTime, setActiveLapTime] = useState(0)

  const start = () => {
    mainStartTime = Date.now()
    lapStartTime = Date.now()
    setRunning(true)
    runTimer()
    if(!started)
      setStarted(true)
  }

  const stop = () => {
    mainSavedTime = mainTime
    lapSavedTime = activeLapTime
    setRunning(false)
    stopTimer()
  }

  const reset = () => {
    mainSavedTime = 0
    lapSavedTime = 0
    slowestLap = -Infinity
    fastestLap = Infinity
    setLapTimes([])
    setMainTime(0)
    setActiveLapTime(0)
    setStarted(false)
  }

  const makeLap = () => {
    updateFastAndSlowLap(activeLapTime)
    setLapTimes([activeLapTime, ...lapTimes])
    setActiveLapTime(0)
    lapStartTime = Date.now()
    lapSavedTime = 0
  }

  const updateFastAndSlowLap = (lapTime) => {
    slowestLap = Math.max(lapTime, slowestLap)
    fastestLap = Math.min(lapTime, fastestLap)
  }

  const getElapsedMainTimeInMilliseconds = () => {
    return Date.now() + mainSavedTime - mainStartTime;
  }

  const getElapsedLapTimeInMilliseconds = () => {
    return Date.now() + lapSavedTime - lapStartTime;
  }

  const runTimer = () => {
    setMainTime(getElapsedMainTimeInMilliseconds())
    setActiveLapTime(getElapsedLapTimeInMilliseconds())
  }

  useEffect(() => {
    running ? intervalId = setInterval(() => {
      runTimer()
    }, 16) : clearInterval(intervalId)
  },[running])

  return (
    <div className="App">
      <div className="background">
        <MainTimer 
        mainTime={mainTime}
        />
        <Buttons 
        running={running} 
        start={start} 
        stop={stop} 
        reset={reset}
        makeLap={makeLap}
        />
        <Laps
        started={started}
        activeLapTime={activeLapTime}
        slowestLap={slowestLap}
        fastestLap={fastestLap}
        lapTimes={lapTimes}
        />
      </div>
    </div>
  )
}

export default App