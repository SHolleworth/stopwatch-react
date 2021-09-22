import React, { useState, useEffect } from "react"
import { renderTime } from '../../utility'

const Laps = (props) => {
  const {
    started,
    makingLap, 
    setMakingLap, 
    activeLapTime, 
    deletingLaps, 
    setDeletingLaps, 
    setActiveLapTime,
    fastestLap,
    slowestLap
  } = props

  const [lapTimes, setLapTimes] = useState([])

  useEffect(() => {
    if(makingLap) {
      updateFastAndSlowLap(activeLapTime)
      setLapTimes([activeLapTime, ...lapTimes])
      setActiveLapTime(0)
      setMakingLap(false)
    }
  },[makingLap])

  useEffect(() => {
    if(deletingLaps) {
      setLapTimes([])
      setDeletingLaps(false)
    }
  },[deletingLaps])

  const updateFastAndSlowLap = (lapTime) => {
    slowestLap.current = Math.max(lapTime, slowestLap.current)
    fastestLap.current = Math.min(lapTime, fastestLap.current)
  }

  const fastLapClass = lapTimes.length > 1 ? "lap--fast-color" : "lap--mask-color"
  const slowLapClass = lapTimes.length > 1 ? "lap--slow-color" : "lap--mask-color"

  const addColorClass = (lapTime, index) => {
    if(index < 1) return
    if(lapTime <= fastestLap.current) {
      return fastLapClass
    }
    else if(lapTime >= slowestLap.current) {
      return slowLapClass
    }
    else {
      return ''
    }
  }

  const renderEmptyLaps = () => {
    const length = Math.max(0, 7 - lapTimes.length - started)
    return new Array(length).fill(0, 0, length).map((el, index) => (
      <div className={"lap"} key={index} />
    ))
  }

  const renderLaps = () => {
    return started ? [activeLapTime, ...lapTimes].map((lapTime, index) => (
      <div className={"lap " + addColorClass(lapTime, index)} key={index}>
        <p>{'Lap ' + (lapTimes.length - index + 1)}</p>
        <p>{renderTime(lapTime)}</p>
      </div>
    )) : null
  }

  return (
    <div className="laps-box">
      {renderLaps()}
      {renderEmptyLaps()}
    </div>
  )
}

export default Laps