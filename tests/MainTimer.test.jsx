import { render, screen } from "@testing-library/react"
import { TimeDisplay } from "../src/components/MainTimer/MainTimer"
import React from 'react'

test("Renders 0 milliseconds correctly", () => {
	render(<TimeDisplay timeInMilliseconds={0} />)
	expect(screen.getByText("00:00.00"))
})

test("Renders seconds correctly", () => {
	render(<TimeDisplay timeInMilliseconds={1000} />)
	expect(screen.getByText("00:01.00"))
})

test("Renders minutes correctly", () => {
	render(<TimeDisplay timeInMilliseconds={60000} />)
	expect(screen.getByText("01:00.00"))
})
