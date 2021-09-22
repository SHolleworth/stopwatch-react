import React, { useState, useRef } from 'react'
import './App.css'
import MainTimer from './components/MainTimer'
import Buttons from './components/Buttons'
import Laps from './components/Laps'

const App = () => {
  const [started, setStarted] = useState(false)
  const [running, setRunning] = useState(false)
  const [mainTime, setMainTime] = useState(0)
  const [activeLapTime, setActiveLapTime] = useState(0)
  const mainStartTime = useRef(0)
  const lapStartTime = useRef(0)
  const mainSavedTime = useRef(0)
  const lapSavedTime = useRef(0)
  const [makingLap, setMakingLap] = useState(false)
  const [deletingLaps, setDeletingLaps] = useState(false)
  const animationId = useRef(0)
  const slowestLap = useRef(-Infinity)
  const fastestLap = useRef(Infinity)

  const start = () => {
    mainStartTime.current = Date.now()
    lapStartTime.current = Date.now()
    setRunning(true)
    runTimer()
    if(!started)
      setStarted(true)
  }

  const stop = () => {
    mainSavedTime.current = mainTime
    lapSavedTime.current = activeLapTime
    setRunning(false)
    stopTimer()
  }

  const reset = () => {
    mainSavedTime.current = 0
    lapSavedTime.current = 0
    slowestLap.current = -Infinity
    fastestLap.current = Infinity
    setMainTime(0)
    setActiveLapTime(0)
    setDeletingLaps(true)
    setStarted(false)
  }

  const makeLap = () => {
    setMakingLap(true)
    lapStartTime.current = Date.now()
    lapSavedTime.current = 0
  }

  const getElapsedMainTimeInMilliseconds = () => {
    return Date.now() + mainSavedTime.current - mainStartTime.current;
  }

  const getElapsedLapTimeInMilliseconds = () => {
    return Date.now() + lapSavedTime.current - lapStartTime.current;
  }

  const runTimer = () => {
    setMainTime(getElapsedMainTimeInMilliseconds())
    setActiveLapTime(getElapsedLapTimeInMilliseconds())
    animationId.current = requestAnimationFrame(runTimer)
  }

  const stopTimer = () => {
    cancelAnimationFrame(animationId.current)
  }

  return (
    <div className="App">
      <div className="background">
        <MainTimer mainTime={mainTime} />
        <Buttons 
        running={running} 
        start={start} 
        stop={stop} 
        reset={reset}
        makeLap={makeLap}
        />
        <Laps
        started={started}
        makingLap={makingLap} 
        setMakingLap={setMakingLap} 
        activeLapTime={activeLapTime} 
        setActiveLapTime={setActiveLapTime}
        deletingLaps={deletingLaps} 
        setDeletingLaps={setDeletingLaps}
        setRunning={setRunning}
        slowestLap={slowestLap}
        fastestLap={fastestLap}/>
      </div>
    </div>
  )
}

export default App