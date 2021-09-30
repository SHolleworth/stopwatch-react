"use strict"
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k]
					},
				})
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
		  })
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v })
		  }
		: function (o, v) {
				o["default"] = v
		  })
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod
		var result = {}
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
		__setModuleDefault(result, mod)
		return result
	}
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
const react_1 = __importStar(require("react"))
require("./App.css")
const MainTimer_1 = __importDefault(require("./components/MainTimer"))
const Buttons_1 = __importDefault(require("./components/Buttons"))
const Laps_1 = __importDefault(require("./components/Laps"))
const useTimer_1 = __importDefault(require("./hooks/useTimer"))
const App = () => {
	const [running, setRunning] = (0, react_1.useState)(false)
	const [lapData, setLapData] = (0, react_1.useState)({
		times: [],
		totalTime: 0,
	})
	const mainTimer = (0, useTimer_1.default)(running)
	const startTimer = () => {
		setRunning(true)
	}
	const stopTimer = () => {
		setRunning(false)
	}
	const resetTimer = () => {
		setLapData({ times: [], totalTime: 0 })
		mainTimer.resetTimer()
	}
	const makeLap = () => {
		setLapData({
			times: [getActiveLapTime(), ...lapData.times],
			totalTime: lapData.totalTime + getActiveLapTime(),
		})
	}
	const getActiveLapTime = () => {
		return mainTimer.elapsedTime - lapData.totalTime
	}
	return react_1.default.createElement(
		"div",
		{ className: "App" },
		react_1.default.createElement(
			"div",
			{ className: "background" },
			react_1.default.createElement(MainTimer_1.default, { elapsedTime: mainTimer.elapsedTime }),
			react_1.default.createElement(Buttons_1.default, {
				running: running,
				startTimer: startTimer,
				stopTimer: stopTimer,
				resetTimer: resetTimer,
				makeLap: makeLap,
			}),
			react_1.default.createElement(Laps_1.default, {
				started: mainTimer.elapsedTime !== 0,
				elapsedTime: getActiveLapTime(),
				lapTimes: lapData.times,
			}),
		),
	)
}
exports.default = App
