import React from "react"

const Buttons = ({running, start, stop, reset, makeLap}: ButtonsType) => {

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

export default Buttons