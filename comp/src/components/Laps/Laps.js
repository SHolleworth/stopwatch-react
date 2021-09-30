"use strict"
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
const react_1 = __importDefault(require("react"))
const utility_1 = require("../../utility")
const Laps = ({ started, elapsedTime, lapTimes }) => {
	const fastLapClass = lapTimes.length > 1 ? "lap--fast-color" : "lap--mask-color"
	const slowLapClass = lapTimes.length > 1 ? "lap--slow-color" : "lap--mask-color"
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
	const addColorClass = index => {
		if (index < 0) return
		if (fastInd === index) {
			return fastLapClass
		} else if (slowInd === index) {
			return slowLapClass
		} else {
			return ""
		}
	}
	const renderEmptyLaps = () => {
		const length = Math.max(0, 7 - lapTimes.length - (started ? 1 : 0))
		return new Array(length)
			.fill(0, 0, length)
			.map((el, index) => react_1.default.createElement("div", { className: "lap", key: index }))
	}
	const renderLaps = () => {
		return started
			? [elapsedTime, ...lapTimes].map((lapTime, index) => {
					const lapNumber = lapTimes.length - index + 1
					return react_1.default.createElement(
						"div",
						{ className: "lap " + addColorClass(index - 1), key: lapNumber },
						react_1.default.createElement("p", null, "Lap " + lapNumber),
						react_1.default.createElement("p", null, (0, utility_1.renderTime)(lapTime)),
					)
			  })
			: null
	}
	return react_1.default.createElement("div", { className: "laps-box" }, renderLaps(), renderEmptyLaps())
}
exports.default = Laps
