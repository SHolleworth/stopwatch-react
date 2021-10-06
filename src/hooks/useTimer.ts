import { useEffect, useState } from "react"
import { TimerPropsType } from "../types"

const useTimer = ({ isRunning, timestamp }: TimerPropsType) => {
	const [elapsedTime, setElapsedTime] = useState(0)
	
	useEffect(() => {
		if (isRunning) {
			const startTime = timestamp - elapsedTime
			const intervalId = setInterval(() => {
				setElapsedTime(Date.now() - startTime)
			}, 16)
			return () => clearInterval(intervalId)
		} else if(timestamp === 0) {
			resetTimer()
		}
	}, [isRunning, timestamp])

	const resetTimer = () => {
		setElapsedTime(0)
	}

	return { elapsedTime, resetTimer }
}

export default useTimer
