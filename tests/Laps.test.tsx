import { render, screen } from "@testing-library/react"
import { Laps } from "../src/components/Laps"

// test("No laps rendered when started = false", () => {
//     render(<Laps started={false}/>)
//     expect(screen.getByTestId("laps-box"))
// })

test("should render 2 laps plus the active lap", () => {
	render(<Laps started={true} lapTimes={[500, 600]} />)

	expect(screen.getByText("Lap 1"))
	expect(screen.getByText("Lap 2"))
	expect(screen.getByText("Lap 3"))
	expect(screen.queryByText("Lap 4")).not.toBeInTheDocument()
})

test("should add fast lap class to fastest lap", () => {
	render(<Laps started={true} lapTimes={[300, 200, 600]} />)

	expect(screen.getByText("Lap 2").classList.contains("lap--fast-color")).toBe(true)
})
