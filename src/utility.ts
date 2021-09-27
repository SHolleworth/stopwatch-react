export const renderTime = (timeInMilliseconds: number) => {
    const date = new Date(timeInMilliseconds)
    const minutes = padTime(date.getMinutes())
    const seconds = padTime(date.getSeconds())
    const milliseconds = padTime(Math.floor(date.getMilliseconds() / 10))
    return minutes + ':' + seconds + "." + milliseconds
}

const padTime = (time: number) => {
    return time.toString().padStart(2, '0')
}