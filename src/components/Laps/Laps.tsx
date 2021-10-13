import React from "react"
import { renderTime } from "../../utility"
import { LapsType } from "../../types"
import { useActiveLapTime, useLapData } from "../../streams/stateStream"

const Laps = ({ started }: LapsType) => {

	const lapTimes = useLapData()

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

	const amountOfEmptyLaps = Math.max(0, 7 - lapTimes.length - (started ? 1 : 0))

	const emptyLaps = new Array(amountOfEmptyLaps)
		.fill(0, 0, amountOfEmptyLaps)
		.map((el, index) => <div className={"lap"} key={index} />)

	const laps = lapTimes.map((lapTime, index) => {
		const lapNumber = lapTimes.length - index
		const colorClass = addColorClass(index)
		return <Lap colorClass={colorClass} lapNumber={lapNumber} lapTime={lapTime} key={lapNumber} />
	})

	return (
		<div className="laps-box">
			{started ? (
				<ActiveLap lapNumber={lapTimes.length + 1} />
			) : null}
			{laps}
			{emptyLaps}
		</div>
	)
}

type ActiveLapType = {
	lapNumber: number
}

const ActiveLap = ({ lapNumber }: ActiveLapType) => {
	const time = useActiveLapTime()
	return <Lap colorClass={""} lapNumber={lapNumber} lapTime={time} />
}

type LapType = {
	colorClass: string
	lapNumber: number
	lapTime: number
}

//Testable
const Lap = ({ colorClass, lapNumber, lapTime }: LapType) => {
	return (
		<div className={"lap " + colorClass} key={lapNumber}>
			<p>{"Lap " + lapNumber}</p>
			<p>{renderTime(lapTime)}</p>
		</div>
	)
}

export default Laps
