import React, { useReducer } from "react"
import "./App.css"
import MainTimer from "./components/MainTimer"
import Buttons from "./components/Buttons"
import Laps from "./components/Laps"
import useTimer from "./hooks/useTimer"
import reducer, { ACTIONS, initialState } from "./reducer"

const App = () => {
	const [{ isRunning, lapData }, dispatch] = useReducer(reducer, initialState)
	const mainTimer = useTimer(isRunning)
	const lapTime = mainTimer.elapsedTime - lapData.totalTime

	return (
		<div className="App">
			<div className="background">
				<MainTimer elapsedTime={mainTimer.elapsedTime} />
				<Buttons
					running={isRunning}
					startTimer={() => dispatch({ type: ACTIONS.START_TIMER, payload: null })}
					stopTimer={() => dispatch({ type: ACTIONS.PAUSE_TIMER, payload: null })}
					resetTimer={() => dispatch({ type: ACTIONS.RESET_TIMER, payload: mainTimer.resetTimer })}
					makeLap={() => dispatch({ type: ACTIONS.MAKE_LAP, payload: lapTime })}
				/>
				<Laps started={mainTimer.elapsedTime !== 0} elapsedTime={lapTime} lapTimes={lapData.times} />
			</div>
		</div>
	)
}

export default App
