import React, { useEffect } from "react"
import { renderTime } from "../../utility"
import { LapsType, TimerPropsType } from "../../types"
import useTimer from "../../hooks/useTimer"

const Laps = ({ started, timerProps, lapData }: LapsType) => {

	const { times: lapTimes, totalTime: totalLapTime } = lapData

	const { slowInd, fastInd } = lapTimes.reduce(
		(acc, lap, ind) => {
			if (lap > acc.slowLap) {
				acc.slowLap = lap
				acc.slowInd = ind
			}
			if (lap < acc.fastLap) {
				acc.fastLap = lap
				acc.fastInd = ind
			}
			return acc
		},
		{
			slowLap: -Infinity,
			fastLap: Infinity,
			slowInd: -1,
			fastInd: -1,
		},
	)

	const fastLapClass = lapTimes.length > 1 ? "lap--fast-color" : "lap--mask-color"
	const slowLapClass = lapTimes.length > 1 ? "lap--slow-color" : "lap--mask-color"

	const addColorClass = (index: number) => {
		if (index < 0) return ""
		if (fastInd === index) {
			return fastLapClass
		} else if (slowInd === index) {
			return slowLapClass
		} else {
			return ""
		}
	}

	const length = Math.max(0, 7 - lapTimes.length - (started ? 1 : 0))

	const emptyLaps = new Array(length).fill(0, 0, length).map((el, index) => <div className={"lap"} key={index} />)

	const laps = lapTimes.map((lapTime, index) => {
				const lapNumber = lapTimes.length - index
				const colorClass = addColorClass(index - 1)
				return (
					<Lap colorClass={colorClass} lapNumber={lapNumber} lapTime={lapTime}/>
				)
		  })

	return  (
		<div className="laps-box">
			{started ? 
			<ActiveLap lapNumber={lapTimes.length + 1} timerProps={timerProps} totalLapTime={totalLapTime}/>
			: null}
			{laps}
			{emptyLaps}
		</div>
	)
}

type LapType = {
	colorClass: string
	lapNumber: number
	lapTime: number
}

const ActiveLap = ({ lapNumber, timerProps, totalLapTime }: { lapNumber: number, timerProps: TimerPropsType, totalLapTime: number }) => {

	const timer = useTimer(timerProps)

	useEffect(() => {
		timer.resetTimer()
	}, [totalLapTime])

	return <Lap colorClass={""} lapNumber={lapNumber} lapTime={timer.elapsedTime - totalLapTime} />
}

const Lap = ({ colorClass, lapNumber, lapTime}: LapType) => {
	return (
		<div className={"lap " + colorClass} key={lapNumber}>
			<p>{"Lap " + lapNumber}</p>
			<p>{renderTime(lapTime)}</p>
		</div>
	)
}

export default Laps
