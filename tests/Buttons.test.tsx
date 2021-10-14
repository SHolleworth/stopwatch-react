import { render, fireEvent, screen } from "@testing-library/react"
import Buttons from "../src/components/Buttons"

const mock = () => {
	return
}

describe("Button rendering", () => {
	test("Lap button should be rendered and disabled when started = false", () => {
		render(
			<Buttons
				started={false}
				running={false}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		expect(screen.getByRole("button", { name: "Lap" })).toBeDisabled()
	})

	test("lapReset button should be Lap when running = true", () => {
		render(
			<Buttons
				started={true}
				running={true}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		expect(screen.getByRole("button", { name: "Lap" })).toBeVisible()
	})

	test("lapReset button should be Lap when running = false", () => {
		render(
			<Buttons
				started={true}
				running={false}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		expect(screen.getByRole("button", { name: "Reset" })).toBeVisible()
	})

	test("startStopButton should be start when running = false", () => {
		render(
			<Buttons
				started={true}
				running={false}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		expect(screen.getByRole("button", { name: "Start" })).toBeVisible()
	})

	test("startStopButton should be start when running = true", () => {
		render(
			<Buttons
				started={true}
				running={true}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		expect(screen.getByRole("button", { name: "Stop" })).toBeVisible()
	})
})

describe("Button functions", () => {
	const mockHandler = jest.fn(() => {
		return "You're fired!"
	})

	test("Start button fires startTimer when pressed", () => {
		render(
			<Buttons
				started={true}
				running={false}
				startTimer={mockHandler}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		fireEvent.click(screen.getByRole("button", { name: "Start" }))
		expect(mockHandler.mock.calls.length).toBe(1)
	})

	test("Stop button fires stopTimer when pressed", () => {
		render(
			<Buttons
				started={true}
				running={true}
				startTimer={mock}
				stopTimer={mockHandler}
				resetTimer={mock}
				makeLap={mock}
			/>,
		)
		fireEvent.click(screen.getByRole("button", { name: "Stop" }))
		expect(mockHandler.mock.calls.length).toBe(1)
	})

	test("Reset button fires resetTimer when pressed", () => {
		render(
			<Buttons
				started={true}
				running={false}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mockHandler}
				makeLap={mock}
			/>,
		)
		fireEvent.click(screen.getByRole("button", { name: "Reset" }))
		expect(mockHandler.mock.calls.length).toBe(1)
	})

	test("Lap button fires makeLap when pressed", () => {
		render(
			<Buttons
				started={true}
				running={true}
				startTimer={mock}
				stopTimer={mock}
				resetTimer={mock}
				makeLap={mockHandler}
			/>,
		)
		fireEvent.click(screen.getByRole("button", { name: "Lap" }))
		expect(mockHandler.mock.calls.length).toBe(1)
	})
})
