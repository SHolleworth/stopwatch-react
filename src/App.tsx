import React, { useState } from "react"
import "./App.css"
import MainTimer from "./components/MainTimer"
import Buttons from "./components/Buttons"
import Laps from "./components/Laps"
import useTimer from "./hooks/useTimer"

const App = () => {
	const [running, setRunning] = useState(false)
	const [lapData, setLapData] = useState<{ times: number[]; totalTime: number }>({
		times: [],
		totalTime: 0,
	})
	const mainTimer = useTimer(running)

	const startTimer = () => {
		setRunning(true)
	}

	const stopTimer = () => {
		setRunning(false)
	}

	const resetTimer = () => {
		setLapData({ times: [], totalTime: 0 })
		mainTimer.resetTimer()
	}

	const makeLap = () => {
		setLapData({
			times: [getActiveLapTime(), ...lapData.times],
			totalTime: lapData.totalTime + getActiveLapTime(),
		})
	}

	const getActiveLapTime = () => {
		return mainTimer.elapsedTime - lapData.totalTime
	}

	return (
		<div className="App">
			<div className="background">
				<MainTimer elapsedTime={mainTimer.elapsedTime} />
				<Buttons
					running={running}
					startTimer={startTimer}
					stopTimer={stopTimer}
					resetTimer={resetTimer}
					makeLap={makeLap}
				/>
				<Laps started={mainTimer.elapsedTime !== 0} elapsedTime={getActiveLapTime()} lapTimes={lapData.times} />
			</div>
		</div>
	)
}

export default App
