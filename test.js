import { Videos } from "./models/Videos.model.js"

const getAllVideos = await Videos.findAll()

getAllVideos.forEach(element => {
    if (element.thumbnail.includes("https://raka.zone/assets/img/thumbnail_not_found.png")) {
        console.log(element.thumbnail)
        element.thumbnail = "https://raka.zone/internal_api/assets/img/thumbnail_not_found.png"
        element.save()
    }

})