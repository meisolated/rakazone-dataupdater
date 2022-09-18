import EventEmitter from "events"
const localizeVideoEvents = new EventEmitter()

interface eventData {
    code: number // 0 : not started 1 : Started 2 : Working on it 3 : Error Occurred 4 : Completed   
    update: string
    message: string
}

localizeVideoEvents.on("videoDownloader", (data: eventData) => {
    // if()
})

export default localizeVideoEvents
