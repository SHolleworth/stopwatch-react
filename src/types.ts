export type ButtonsType = {
	started: boolean
	running: boolean
	startTimer: () => void
	stopTimer: () => void
	resetTimer: () => void
	makeLap: () => void
}

export type LapsType = {
	started: boolean
	lapTimes: number[]
}

export type TimerPropsType = {
	isRunning: boolean
	timestamp: number
}
