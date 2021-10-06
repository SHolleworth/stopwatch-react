type stateType = {
	isRunning: boolean
	lapData: {
		times: number[]
		totalTime: number
	}
}

type actionType = {
	type: string
	payload: any
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
	lapData: {
		times: [],
		totalTime: 0,
	},
}

const reducer = (state: stateType, action: actionType) => {
	switch (action.type) {
		case ACTIONS.START_TIMER:
			return { ...state, isRunning: true }
		case ACTIONS.PAUSE_TIMER:
			return { ...state, isRunning: false }
		case ACTIONS.RESET_TIMER:
			action.payload()
			return { ...state, lapData: { times: [], totalTime: 0 } }
		case ACTIONS.MAKE_LAP:
			return {
				...state,
				lapData: {
					times: [action.payload, ...state.lapData.times],
					totalTime: state.lapData.totalTime + action.payload,
				},
			}
		default:
			throw new Error("Error: Action type not recognised.")
	}
}

export default reducer
