import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import './App.css'

const App = () => {
  const [running, setRunning] = useState(false)
  const [mainStartTime, setMainStartTime] = useState(0)
  const [lapStartTime, setLapStartTime] = useState(0)
  const [mainTime, setMainTime] = useState(0)
  const [activeLapTime, setActiveLapTime] = useState(0)
  const [mainSavedTime, setMainSavedTime] = useState(0)
  const [lapSavedTime, setLapSavedTime] = useState(0)
  const [makingLap, setMakingLap] = useState(false)
  const [deletingLaps, setDeletingLaps] = useState(false)
  const [animationId, setAnimationId] = useState(0)

  const start = () => {
    setRunning(true)
    setMainStartTime(Date.now())
    setLapStartTime(Date.now())
  }

  const stop = () => {
    setRunning(false)
    setMainSavedTime(mainTime)
    setLapSavedTime(activeLapTime)
  }

  const reset = () => {
    setMainSavedTime(0)
    setMainTime(0)
    setLapSavedTime(0)
    setActiveLapTime(0)
    setDeletingLaps(true)
  }

  const makeLap = () => {
    setRunning(false)
    setMakingLap(true)
    setLapStartTime(Date.now())
    setLapSavedTime(0)
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
    setAnimationId(requestAnimationFrame(runTimer))
  }

  const stopTimer = () => {
    cancelAnimationFrame(animationId)
  }

  useEffect(() => {
    running ? runTimer() : stopTimer()
  }, [running])

  return (
    <div className="App">
      <div className="background">
        <MainTimer mainTime={mainTime} />
        <Buttons 
        running={running} 
        start={start} 
        stop={stop} 
        reset={reset} 
        makeLap={makeLap}/>
        <Laps 
        makingLap={makingLap} 
        setMakingLap={setMakingLap} 
        activeLapTime={activeLapTime} 
        setActiveLapTime={setActiveLapTime}
        deletingLaps={deletingLaps} 
        setDeletingLaps={setDeletingLaps}
        setRunning={setRunning}/>
      </div>
    </div>
  )
}

const MainTimer = ({mainTime}) => {
  return (
    <div className="main-timer-box">
      <h1>{renderTime(mainTime)}</h1>
    </div>
  )
}

const Buttons = ({running, start, stop, reset, makeLap}) => {

  const startButton = <button className="start-stop-button button--start-color" onClick={start}><p>Start</p></button>
  const stopButton =  <button className="start-stop-button button--stop-color" onClick={stop}><p>Stop</p></button>
  const renderStartStopButton = () => {
    return running ? stopButton : startButton
  }

  const resetButton = <button className="reset-lap-button" onClick={reset}><p>Reset</p></button>
  const lapButton = <button className="reset-lap-button" onClick={makeLap}><p>Lap</p></button>
  const renderResetLapButton = () => {
    return running ? lapButton : resetButton
  }

  return (
    <div className="button-box">
      {renderResetLapButton()}
      {renderStartStopButton()}
    </div>
  )
}

const Laps = (props) => {

  const {
    makingLap, 
    setMakingLap, 
    activeLapTime, 
    deletingLaps, 
    setDeletingLaps, 
    setActiveLapTime,
    setRunning
  } = props

  const [lapTimes, setLapTimes] = useState([])

  useEffect(() => {
    if(makingLap) {
      setLapTimes([activeLapTime, ...lapTimes])
      setActiveLapTime(0)
      setMakingLap(false)
      setRunning(true)
    }
  },[makingLap])

  useEffect(() => {
    if(deletingLaps) {
      setLapTimes([])
      setDeletingLaps(false)
    }
  },[deletingLaps])

  const renderLaps = () => {
    return [activeLapTime, ...lapTimes].map((lapTime, index) => (
      <div className="lap" key={index}>
        <p>{'Lap ' + (lapTimes.length - index + 1)}</p>
        <p>{renderTime(lapTime)}</p>
      </div>
    ))
  }

  return (
    <div className="laps-box">
      {renderLaps()}
    </div>
  )
}

const renderTime = (timeInMilliseconds) => {
  const date = new Date(timeInMilliseconds)
  const minutes = padTime(date.getMinutes())
  const seconds = padTime(date.getSeconds())
  const milliseconds = padTime(Math.floor(date.getMilliseconds() / 10))
  return minutes + ':' + seconds + "." + milliseconds
}

const padTime = (time) => {
  return time.toString().padStart(2, '0')
}


export default App
