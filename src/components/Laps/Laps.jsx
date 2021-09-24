import React from "react"
import { renderTime } from '../../utility'

const Laps = ({started, activeLapTime, lapTimes}) => {

  const fastLapClass = lapTimes.length > 1 ? "lap--fast-color" : "lap--mask-color"
  const slowLapClass = lapTimes.length > 1 ? "lap--slow-color" : "lap--mask-color"

  const { slowInd, fastInd } = lapTimes.reduce((acc, lap, ind) => {
    if(lap > acc.slowLap) {
      acc.slowLap = lap
      acc.slowInd = ind
    }
    if(lap < acc.fastLap) {
      acc.fastLap = lap
      acc.fastInd = ind
    }
    return acc
  }, { 
    slowLap: -Infinity, 
    fastLap: Infinity, 
    slowInd: -1, 
    fastInd: -1 
  })

  const addColorClass = (index) => {
    if(index < 0) return
    if(fastInd === index) {
      return fastLapClass
    }
    else if(slowInd === index) {
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
      <div className={"lap " + addColorClass(index - 1)} key={index}>
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