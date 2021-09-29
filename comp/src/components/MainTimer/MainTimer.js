"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utility_1 = require("../../utility");
const MainTimer = ({ elapsedTime }) => {
    return (react_1.default.createElement("div", { className: "main-timer-box" },
        react_1.default.createElement("h1", null, (0, utility_1.renderTime)(elapsedTime))));
};
exports.default = MainTimer;
