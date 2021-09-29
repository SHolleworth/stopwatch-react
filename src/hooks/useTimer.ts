import { useEffect, useState } from "react"

const useTimer = (running: boolean) => {
	const [elapsedTime, setElapsedTime] = useState(0)

	useEffect(() => {
		if (running) {
			const startTime = Date.now() - elapsedTime
			const intervalId = setInterval(() => {
				setElapsedTime(Date.now() - startTime)
			}, 16)
			return () => clearInterval(intervalId)
		}
	}, [running])

	const resetTimer = () => {
		setElapsedTime(0)
	}

	return { elapsedTime, resetTimer }
}

export default useTimer
