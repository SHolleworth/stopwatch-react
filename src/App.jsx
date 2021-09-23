import React, { useState, useEffect } from 'react'
import './App.css'
import MainTimer from './components/MainTimer'
import Buttons from './components/Buttons'
import Laps from './components/Laps'

let slowestLap = -Infinity
let fastestLap = Infinity

const getElapsedTimeInMilliseconds = (startTime) => {
  return Date.now() - startTime;
}

const App = () => {
  const [started, setStarted] = useState(false)
  const [running, setRunning] = useState(false)
  const [activeLapTime, setActiveLapTime] = useState(0)
  const [mainTime, setMainTime] = useState(0)
  const [lapTimes, setLapTimes] = useState([])
  
  useEffect(() => {
    const lapStartTime = Date.now() - activeLapTime
    if(running) {
      const mainStartTime = Date.now() - mainTime
      const intervalId = setInterval(() => { runTimer(mainStartTime, lapStartTime) }, 16)
      return () => clearInterval(intervalId)
    }
  },[running, lapTimes])
  
  const start = () => {
    setRunning(true)
    if(!started)
      setStarted(true)
  }

  const stop = () => {
    setRunning(false)
  }

  const reset = () => {
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
  }

  const updateFastAndSlowLap = (lapTime) => {
    slowestLap = Math.max(lapTime, slowestLap)
    fastestLap = Math.min(lapTime, fastestLap)
  }

  const runTimer = (mainStartTime, lapStartTime) => {
    setMainTime(getElapsedTimeInMilliseconds(mainStartTime))
    setActiveLapTime(getElapsedTimeInMilliseconds(lapStartTime))
  }

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