export type ButtonsType = {
	running: boolean
	startTimer: () => void
	stopTimer: () => void
	resetTimer: () => void
	makeLap: () => void
}

export type LapsType = {
	started: boolean
	elapsedTime: number
	lapTimes: number[]
}
