"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Buttons = ({ running, startTimer, stopTimer, resetTimer, makeLap }) => {
    const startButton = (react_1.default.createElement("button", { className: "start-stop-button button--start-color", onClick: startTimer },
        react_1.default.createElement("p", null, "Start")));
    const stopButton = (react_1.default.createElement("button", { className: "start-stop-button button--stop-color", onClick: stopTimer },
        react_1.default.createElement("p", null, "Stop")));
    const renderStartStopButton = () => {
        return running ? stopButton : startButton;
    };
    const resetButton = (react_1.default.createElement("button", { className: "reset-lap-button", onClick: resetTimer },
        react_1.default.createElement("p", null, "Reset")));
    const lapButton = (react_1.default.createElement("button", { className: "reset-lap-button", onClick: makeLap },
        react_1.default.createElement("p", null, "Lap")));
    const renderResetLapButton = () => {
        return running ? lapButton : resetButton;
    };
    return (react_1.default.createElement("div", { className: "button-box" },
        renderResetLapButton(),
        renderStartStopButton()));
};
exports.default = Buttons;
