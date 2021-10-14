import React from "react"
import "./App.css"
import MainTimer from "./components/MainTimer"
import Buttons from "./components/Buttons"
import Laps from "./components/Laps"
import { useIsRunning, startTimer, pauseTimer, resetTimer, pushLap, useIsStarted } from "./streams/stateStream"

const App = () => {
	//const [{ isRunning, mainData, lapData }, dispatch] = useReducer(reducer, initialState)

	const isRunning = useIsRunning()
	const isStarted = useIsStarted()

	return (
		<div className="App">
			<div className="background">
				<MainTimer />
				<Buttons
					started={isStarted}
					running={isRunning}
					startTimer={startTimer}
					stopTimer={pauseTimer}
					resetTimer={resetTimer}
					makeLap={pushLap}
				/>
				<Laps started={isStarted} />
			</div>
		</div>
	)
}

export default App
