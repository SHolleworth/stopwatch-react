import { render } from "@testing-library/react";
import React from "react";
import Buttons from "../src/components/Buttons";

test('should render reset and start buttons when not running', () => {
    const mock = () => {}
    render(<Buttons startTimer={mock} stopTimer={mock} resetTimer={mock} makeLap={mock} running={false} />)
})
