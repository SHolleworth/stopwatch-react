export type ButtonsType = {
	running: boolean
	startTimer: () => void
	stopTimer: () => void
	resetTimer: () => void
	makeLap: () => void
}

export interface TimerData {
	timestamp: number
	savedTime: number
}

export interface LapData extends TimerData {
	times: number[]
	totalTime: number
}

export type LapsType = {
	started: boolean
	timerProps: TimerPropsType
	lapData: LapData
}

export type TimerPropsType = {
	isRunning: boolean
	timestamp: number
}
