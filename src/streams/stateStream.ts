import { bind, shareLatest } from "@react-rxjs/core"
import { map, withLatestFrom, BehaviorSubject, combineLatest, first } from "rxjs"

const INITIAL_RUNNING = false
const INITIAL_TIME = 0
const INITIAL_LAP_DATA: number[] = []

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

const unshiftLap = (lapTime: number) => {
	console.log("Adding lap: " + lapTime)
	lapDataSubject$
		.pipe(first())
		.subscribe((laps: number[]) => {
			console.log("Laps in unshiftLap " + laps)
			lapDataSubject$.next([lapTime, ...laps])
		})
		.unsubscribe()
}

const pushLap = () => {
	activeLapTime$
		.pipe(first())
		.subscribe(time => {
			unshiftLap(time)
		})
		.unsubscribe()
}

lapDataSubject$.subscribe(laps => {
	console.log("Laps from subscription: " + laps)
})

const activeLapTime$ = combineLatest([
	elapsedTimeSubject$,
	lapDataSubject$.pipe(map(laps => laps.reduce((totalTime, laps) => totalTime + laps, 0))),
]).pipe(
	map(([elapsedTime, totalLapTime]: number[]) => {
		return elapsedTime - totalLapTime
	}),
)

const isRunningWithLatestElapsedTime$ = isRunningSubject$.pipe(
	withLatestFrom(elapsedTimeSubject$),
	map(([isRunning, elapsedTime]: [boolean, number]) => {
		return { isRunning, elapsedTime }
	}),
)

let intervalId: null | NodeJS.Timer = null
isRunningWithLatestElapsedTime$.subscribe(({ isRunning, elapsedTime }: { isRunning: boolean; elapsedTime: number }) => {
	if (intervalId) clearInterval(intervalId)
	if (isRunning) {
		const start = Date.now() - elapsedTime
		intervalId = setInterval(() => {
			elapsedTimeSubject$.next(Date.now() - start)
		}, 10)
	}
})

const [useElapsedTime, elapsedTime$] = bind(elapsedTimeSubject$, INITIAL_TIME)
const [useLapData] = bind(lapDataSubject$, INITIAL_LAP_DATA)
const [useActiveLapTime] = bind(activeLapTime$, 0)
const [useIsRunning] = bind(isRunningSubject$, INITIAL_RUNNING)
const [useIsStarted] = bind(elapsedTime$.pipe(map(time => time > 0)), false)

export {
	useElapsedTime,
	useLapData,
	useActiveLapTime,
	useIsRunning,
	useIsStarted,
	startTimer,
	pauseTimer,
	resetTimer,
	pushLap,
}
