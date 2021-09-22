import React from "react"
import { renderTime } from '../../utility'

const MainTimer = ({mainTime}) => {
  return (
    <div className="main-timer-box">
      <h1>{renderTime(mainTime)}</h1>
    </div>
  )
}

export default MainTimer