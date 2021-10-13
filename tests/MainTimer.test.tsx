import { TimeDisplay } from "../src/components/MainTimer/MainTimer"
import { render, screen } from "@testing-library/react"
import React from "react"

test("Renders time correctly", () => {
	render(<TimeDisplay timeInMilliseconds={6000} />)
	expect(screen.getByText("00:06.00"))
})
