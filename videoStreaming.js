import fs from "fs"
import express from "express"
const app = express()
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/video/:videoId", function (req, res) {
    const range = req.headers.range
    const videoId = req.params.videoId
    if (!range) {
        res.status(400).send("Requires Range header")
    }
    const videoPath = "./downloads/output/" + videoId + "/output.mp4"
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }
    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, { start, end })
    videoStream.pipe(res)
})

app.listen(8090, function () {
    console.log("Listening on port 8090!")
})
