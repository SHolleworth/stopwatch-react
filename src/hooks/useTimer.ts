import { useEffect, useState } from "react"

const useTimer = (isRunning: boolean) => {

    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        if(isRunning) {
            const startTime = Date.now() - elapsedTime
            const intervalId = setInterval(() => { setElapsedTime(Date.now() - startTime) }, 16)
            return () => clearInterval(intervalId)
        }
    },[isRunning])

    const resetTimer = () => {
        setElapsedTime(0)
    }

    return { elapsedTime, resetTimer }
}



export default useTimer