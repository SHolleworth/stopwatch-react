import { bind, shareLatest } from "@react-rxjs/core"
import { map, withLatestFrom, BehaviorSubject, combineLatest, first } from "rxjs"

const INITIAL_RUNNING = false
const INITIAL_TIME = 0
const INITIAL_LAP_DATA = []

const isRunningSubject$ = new BehaviorSubject(INITIAL_RUNNING)
const elapsedTimeSubject$ = new BehaviorSubject(INITIAL_TIME)
const lapDataSubject$ = new BehaviorSubject(INITIAL_LAP_DATA)

const startTimer = () => {
	isRunningSubject$.next(true)
}

const pauseTimer = () => {
	isRunningSubject$.next(false)
}

const resetTimer = () => {
	elapsedTimeSubject$.next(0)
	lapDataSubject$.next([])
}

const unshiftLap = lapTime => {
	console.log("Adding lap: " + lapTime)
	lapDataSubject$
		.pipe(first())
		.subscribe(lapTimes => {
			lapDataSubject$.next([lapTime, ...lapTimes])
		})
		.unsubscribe()
}

const totalLapTime$ = lapDataSubject$.pipe(
	map(laps => laps.reduce((acc, curr) => acc + curr, 0)),
	shareLatest(),
)

const activeLapTimeObservable$ = combineLatest([elapsedTimeSubject$, totalLapTime$]).pipe(
	map(([elapsedTime, totalLapTime]) => elapsedTime - totalLapTime),
	shareLatest(),
)

const isRunningWithLatestElapsedTime$ = isRunningSubject$.pipe(
	withLatestFrom(elapsedTimeSubject$),
	map(([isRunning, elapsedTime]) => ({ isRunning, elapsedTime })),
	shareLatest(),
)

let intervalId = 0
isRunningWithLatestElapsedTime$.subscribe(({ isRunning, elapsedTime }) => {
	clearInterval(intervalId)
	if (isRunning) {
		const start = Date.now() - elapsedTime
		intervalId = setInterval(() => {
			elapsedTimeSubject$.next(Date.now() - start)
		}, 10)
	}
})

const [useElapsedTime, elapsedTime$] = bind(elapsedTimeSubject$, INITIAL_TIME)
const [useLapData, lapData$] = bind(lapDataSubject$, INITIAL_LAP_DATA)
const [useActiveLapTime, activeLapTime$] = bind(activeLapTimeObservable$, 0)

export { useElapsedTime, useLapData, useActiveLapTime }
