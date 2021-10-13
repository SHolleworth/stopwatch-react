import React from "react"
import useTimer from "../../hooks/useTimer"
import { TimerPropsType } from "../../types"
import { renderTime } from "../../utility"

const MainTimer = ({ timerProps }: { timerProps: TimerPropsType }) => {
	return (
		<div className="main-timer-box">
			<TimeContainer timerProps={timerProps} />
		</div>
	)
}

const TimeContainer = ({ timerProps }: { timerProps: TimerPropsType }) => {
	const timer = useTimer(timerProps)
	return <TimeDisplay timeInMilliseconds={timer.elapsedTime} />
}

//Container Component pattern for testable display
export const TimeDisplay = ({ timeInMilliseconds }: { timeInMilliseconds: number }) => {
	return <h1>{renderTime(timeInMilliseconds)}</h1>
}

export default MainTimer