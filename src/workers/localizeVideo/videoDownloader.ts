import cp from "child_process"
import fs from "fs"
import ytdl from "ytdl-core"
import logger from "../../util/logger"
import localizeVideoEvents from "./eventEmitter"

const ytBaseUrl = "https://www.youtube.com/watch?v="
const types = [
    { type: "highestaudio", fileType: ".mp3" },
    { type: "highestvideo", fileType: ".mp4" },
]

//  ----------------- FUNCTIONS -----------------
const YtdlDownloader = (videoId: string, _type: number, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        ytdl(ytBaseUrl + videoId, { quality: types[_type].type })
            .on("progress", (chunkLength: number, downloaded: number, total: number) => {
                let progress = (downloaded / total) * 100
                logger.info(`Downloading ${videoId}${types[_type].fileType} | ${progress} \n Dir ${dir}`)
            })
            .pipe(fs.createWriteStream(`${dir}/src${types[_type].fileType}`))
            .on("finish", () => {
                const TimeTook = (Date.now() - startTime) / 1000
                logger.info(`Downloaded ${videoId}${types[_type].fileType} in ${TimeTook} seconds  \n Dir ${dir}`)
                return resolve({ status: "downloaded" })
            })
            .on("error", (err) => {
                return reject({ message: err.message, name: err.name, status: "error" })
            })
    })

const mergeAudioAndVideo = (videoId: string, dir: string) => new Promise((resolve, reject) => {})
