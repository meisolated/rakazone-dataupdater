import fs from "fs"
import https from "https"
import { Transform } from "stream"
import { Videos } from "../models/index.js"

const videosList = await Videos.find()

videosList.map(async (video, index) => {
    // http://i.ytimg.com/vi/xqann191kbY/maxresdefault.jpg
    // https://img.youtube.com/vi/xqann191kbY/mqdefault.jpg
    // https://img.youtube.com/vi/xqann191kbY/sddefault.jpg
    // https://img.youtube.com/vi/xqann191kbY/hqdefault.jpg
    // https://img.youtube.com/vi/xqann191kbY/default.jpg
    // https://img.youtube.com/vi/xqann191kbY/0.jpg
    // https://img.youtube.com/vi/xqann191kbY/1.jpg
    // https://img.youtube.com/vi/xqann191kbY/2.jpg
    // https://img.youtube.com/vi/xqann191kbY/3.jpg
    // https://img.youtube.com/vi/xqann191kbY/4.jpg'

    let baseUrl = "https://img.youtube.com/vi/"
    let thumbnails = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"]

    thumbnails.map(async (thumbnail, index) => {
        if (!fs.existsSync(`./downloads/videoThumbnails/${video.videoId + "-" + thumbnail}.jpg`)) {
            const request = https.request(baseUrl + video.videoId + "/" + thumbnail + ".jpg", function (response) {
                if (response.statusCode == 404) return
                var data = new Transform()

                response.on("data", function (chunk) {
                    data.push(chunk)
                })
                response.on("end", function () {
                    fs.writeFileSync(`./downloads/videoThumbnails/${video.videoId + "-" + thumbnail}.jpg`, data.read())
                    console.log(video.videoId + " " + thumbnail + " downloaded")
                })
            })

            request.end()
            request.on("error", (e) => {
                console.log(e)
            })

        }
    })

    //  ____________________________________________________________________
    //  https://i.ytimg.com/vi/oZJLyWLUWrc/hq720.jpg
    if (!fs.existsSync(`./downloads/videoThumbnails/${video.videoId + "-hq720"}.jpg`)) {
        const request = https.request(`https://i.ytimg.com/vi/${video.videoId}/hq720.jpg`, function (response) {
            if (response.statusCode == 404) return
            var data = new Transform()
            response.on("data", function (chunk) {
                data.push(chunk)
            })
            response.on("end", function () {
                fs.writeFileSync(`./downloads/videoThumbnails/${video.videoId + "-hq720"}.jpg`, data.read())
                console.log(video.videoId + " " + "hq720" + " downloaded")
            })
        })
        request.end()
        request.on("error", (e) => {
            console.log(e)
        })
    }
})
