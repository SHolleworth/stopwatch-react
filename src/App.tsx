import React, { useReducer } from "react"
import "./App.css"
import MainTimer from "./components/MainTimer"
import Buttons from "./components/Buttons"
import Laps from "./components/Laps"
import reducer, { ACTIONS, initialState } from "./reducer"

const App = () => {
	const [{ isRunning, mainData, lapData }, dispatch] = useReducer(reducer, initialState)

	const mainTimerProps = { isRunning, timestamp: mainData.timestamp }
	const lapTimerProps = { isRunning, timestamp: lapData.timestamp }

	const started = lapData.timestamp > 0

	return (
		<div className="App">
			<div className="background">
				<MainTimer timerProps={mainTimerProps} />
				<Buttons
					started={started}
					running={isRunning}
					startTimer={() => dispatch({ type: ACTIONS.START_TIMER, payload: null })}
					stopTimer={() => dispatch({ type: ACTIONS.PAUSE_TIMER, payload: null })}
					resetTimer={() => dispatch({ type: ACTIONS.RESET_TIMER, payload: null })}
					makeLap={() => dispatch({ type: ACTIONS.MAKE_LAP, payload: null })}
				/>
				<Laps started={started} timerProps={lapTimerProps} lapData={lapData} />
			</div>
		</div>
	)
}

export default App
