import React from "react"
import { renderTime } from "../../utility"

const MainTimer = ({ elapsedTime }: { elapsedTime: number }) => {
	return (
		<div className="main-timer-box">
			<h1>{renderTime(elapsedTime)}</h1>
		</div>
	)
}

export default MainTimer
