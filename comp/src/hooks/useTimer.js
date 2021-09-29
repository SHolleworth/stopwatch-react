"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useTimer = (running) => {
    const [elapsedTime, setElapsedTime] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (running) {
            const startTime = Date.now() - elapsedTime;
            const intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 16);
            return () => clearInterval(intervalId);
        }
    }, [running]);
    const resetTimer = () => {
        setElapsedTime(0);
    };
    return { elapsedTime, resetTimer };
};
exports.default = useTimer;
