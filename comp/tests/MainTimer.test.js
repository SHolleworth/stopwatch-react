"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainTimer_1 = __importDefault(require("../src/components/MainTimer"));
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
test("", () => {
    (0, react_1.render)(react_2.default.createElement(MainTimer_1.default, { elapsedTime: 0 }));
    expect(react_1.screen.getByText('00:00.01'));
});
