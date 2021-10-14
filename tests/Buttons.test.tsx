import { render } from "@testing-library/react"
import React from "react"
import Buttons from "../src/components/Buttons"

test("should render reset and start buttons when not running", () => {
	const mock = () => {
		return
	}
	render(
		<Buttons started={true} startTimer={mock} stopTimer={mock} resetTimer={mock} makeLap={mock} running={false} />,
	)
})
