import React from "react"
import useTimer from "../../hooks/useTimer"
import { TimerPropsType } from "../../types"
import { renderTime } from "../../utility"

const MainTimer = ({ timerProps }: { timerProps: TimerPropsType }) => {
	
	return (
		<div className="main-timer-box">
			<Time timerProps={timerProps} />
		</div>
	)
}

const Time = ({ timerProps }: { timerProps: TimerPropsType }) => {
	const timer = useTimer(timerProps)
	return <h1>{renderTime(timer.elapsedTime)}</h1>
}

export default MainTimer
