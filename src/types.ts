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
}

export type TimerPropsType = {
	isRunning: boolean
	timestamp: number
}
