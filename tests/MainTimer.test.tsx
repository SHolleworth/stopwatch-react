import MainTimer from "../src/components/MainTimer"
import { render, screen } from "@testing-library/react"
import React from "react"

test("Renders time correctly", () => {
	render(<MainTimer elapsedTime={6000} />)
	expect(screen.getByText("00:06.00"))
})