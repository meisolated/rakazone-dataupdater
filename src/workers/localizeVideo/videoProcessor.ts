import cp, { spawn } from "child_process"
import fs from "fs"
import ytdl from "ytdl-core"
import logger from "../../util/logger"
// import localizeVideoEvents from "./eventEmitter"

const ytBaseUrl = "https://www.youtube.com/watch?v="
const types = [
    { type: "highestaudio", fileType: ".mp3" },
    { type: "highestvideo", fileType: ".mp4" },
]

//  ----------------- FUNCTIONS -----------------
export const YtdlDownloader = (videoId: string, _type: number, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        let startingLogged = false
        ytdl(ytBaseUrl + videoId, { quality: types[_type].type })
            .on("progress", (chunkLength: number, downloaded: number, total: number) => {
                let progress = (downloaded / total) * 100
                if (!startingLogged) logger.info(`Downloading ${videoId}${types[_type].fileType} \n Dir ${dir}`)
                startingLogged = true
            })
            .pipe(fs.createWriteStream(`${dir}/src${types[_type].fileType}`))
            .on("finish", () => {
                const TimeTook = (Date.now() - startTime) / 1000
                logger.info(`Downloaded ${videoId}${types[_type].fileType} in ${TimeTook} seconds  \n Dir ${dir}`)
                return resolve({ status: "downloaded" })
            })
            .on("error", (err) => {
                logger.info(`Error while trying to download ${videoId} | ${err.message}`)
                return reject({ message: err.message, name: err.name, status: "error" })
            })
    })

export const mergeAudioAndVideo = (videoId: string, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        cp.exec(`ffmpeg -i ${dir}src.mp3 -i ${dir}src.mp4 -c copy ${dir}output.mp4`, (err, stdout, stderr) => {
            if (err) {
                logger.info(`Error while trying to merge ${videoId} | ${err.message}`)
                return reject({ error: err.message, name: err.name, status: "error" })
            }
            if (stderr) {
                logger.info(`Error in convertToHLS ${stderr}`)
            }
            const endTime = Date.now()
            logger.info(`Merge complete for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
            return resolve({ status: "merged" })
        })
    })

export const generatePreviewImages = (videoId: string, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        cp.exec(`ffmpeg -i ${dir}output.mp4 -vf fps=1/10,scale=120:-1 ${dir}preview_%d.jpg`, (err, stdout, stderr) => {
            if (err) {
                logger.info(`Error while trying to generate preview ${videoId} | ${err.message}`)
                return reject({ error: err.message, name: err.name, status: "error" })
            }
            if (stderr) {
                logger.info(`Error in convertToHLS ${stderr}`)
            }
            const endTime = Date.now()
            logger.info(`Previews generated for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
            return resolve({ status: "previewgenerated" })
        })
    })

export const convertToHLS = (videoId: string, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        cp.exec(`bash ./create-vod-hls.sh ${dir}output.mp4 ${dir}/HLS`, (err, stdout, stderr) => {
            if (err) {
                logger.info(`Error while trying to generate preview ${videoId} | ${err.message}`)
                return reject({ error: err.message, name: err.name, status: "error" })
            }

            if (stderr) {
                logger.info(`Error in convertToHLS ${stderr}`)
            }
            const endTime = Date.now()
            logger.info(`HLS Converted for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
            return resolve({ status: "hlsconverted" })
        })
    })
