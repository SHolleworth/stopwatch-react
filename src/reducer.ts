import { LapData, TimerData } from "./types"

type stateType = {
	isRunning: boolean
	mainData: TimerData
	lapData: LapData
}

type actionType = {
	type: string
}

export const ACTIONS = {
	START_TIMER: "START_TIMER",
	PAUSE_TIMER: "PAUSE_TIMER",
	RESET_TIMER: "RESET_TIMER",
	MAKE_LAP: "MAKE_LAP",
	SET_TIME: "SET_TIME",
}

export const initialState = {
	isRunning: false,
	mainData: {
		timestamp: 0,
		savedTime: 0,
	},
	lapData: {
		timestamp: 0,
		savedTime: 0,
		times: [],
		totalTime: 0,
	},
}

const reducer = (state: stateType, action: actionType) => {
	switch (action.type) {
		case ACTIONS.START_TIMER:
			return {
				...state,
				isRunning: true,
				mainData: {
					...state.mainData,
					timestamp: Date.now(),
				},
				lapData: {
					...state.lapData,
					timestamp: Date.now(),
				},
			}

		case ACTIONS.PAUSE_TIMER:
			return {
				...state,
				isRunning: false,
				lapData: {
					...state.lapData,
					savedTime: Date.now() - state.lapData.timestamp + state.lapData.savedTime,
				},
			}

		case ACTIONS.RESET_TIMER:
			return initialState

		case ACTIONS.MAKE_LAP:
			const newLapTime = Date.now() - state.lapData.timestamp + state.lapData.savedTime
			return {
				...state,
				lapData: {
					savedTime: 0,
					timestamp: Date.now(),
					times: [newLapTime, ...state.lapData.times],
					totalTime: state.lapData.totalTime + newLapTime,
				},
			}

		default:
			throw new Error("Error: Action type not recognised.")
	}
}

export default reducer
