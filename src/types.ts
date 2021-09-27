type ButtonsType = {
    running: boolean
    start: () => void
    stop: () => void
    reset: () => void
    makeLap: () => void
}

type LapsType = {
    started: boolean
    activeLapTime: number
    lapTimes: number[]
}