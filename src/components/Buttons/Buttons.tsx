import React from "react"
import { ButtonsType } from "../../types"

const Buttons = ({ started, running, startTimer, stopTimer, resetTimer, makeLap }: ButtonsType) => {
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
	const startStopButton = running ? stopButton : startButton

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
	const lapButtonDisabled = (
		<button className="reset-lap-button__disabled" disabled={true} onClick={makeLap}>
			<p>Lap</p>
		</button>
	)
	const resetLapButton = () => (started ? (running ? lapButton : resetButton) : lapButtonDisabled)

	return (
		<div className="button-box">
			{resetLapButton()}
			{startStopButton}
		</div>
	)
}

export default Buttons
