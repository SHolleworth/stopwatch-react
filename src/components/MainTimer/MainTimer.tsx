import React from "react"
import { useElapsedTime } from "../../streams/stateStream"
import { renderTime } from "../../utility"

const MainTimer = () => {
	return (
		<div className="main-timer-box">
			<TimeContainer />
		</div>
	)
}

const TimeContainer = () => {
	const time = useElapsedTime()
	return <TimeDisplay timeInMilliseconds={time} />
}

//Container Component pattern for testable display
export const TimeDisplay = ({ timeInMilliseconds }: { timeInMilliseconds: number }) => {
	return <h1>{renderTime(timeInMilliseconds)}</h1>
}

export default MainTimer
