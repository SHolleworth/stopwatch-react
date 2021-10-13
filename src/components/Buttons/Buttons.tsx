import React from "react"
import { ButtonsType } from "../../types"

const Buttons = ({ running, startTimer, stopTimer, resetTimer, makeLap }: ButtonsType) => {
	const startButton = (
		<button className="start-stop-button button--start-color" onClick={startTimer}>
			<p>Start</p>
		</button>
	)
	const stopButton = (
		<button className="start-stop-button button--stop-color" onClick={stopTimer}>
			<p>Stop</p>
		</button>
	)
	const renderStartStopButton = () => {
		return running ? stopButton : startButton
	}

	const resetButton = (
		<button className="reset-lap-button" onClick={resetTimer}>
			<p>Reset</p>
		</button>
	)
	const lapButton = (
		<button className="reset-lap-button" onClick={makeLap}>
			<p>Lap</p>
		</button>
	)
	const renderResetLapButton = running ? lapButton : resetButton

	return (
		<div className="button-box">
			{renderResetLapButton}
			{renderStartStopButton()}
		</div>
	)
}

export default Buttons
