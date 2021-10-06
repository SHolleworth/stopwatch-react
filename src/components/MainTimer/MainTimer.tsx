import React from "react"
import useTimer from "../../hooks/useTimer"
import { TimerPropsType } from "../../types"
import { renderTime } from "../../utility"

const MainTimer = ({ timerProps }: { timerProps: TimerPropsType }) => {
	const timer = useTimer(timerProps)
	return (
		<div className="main-timer-box">
			<h1>{renderTime(timer.elapsedTime)}</h1>
		</div>
	)
}

export default MainTimer
