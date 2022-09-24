import cp from "child_process"
import fs from "fs"
import request from "request"
import ytdl from "ytdl-core"
import logger from "../../util/logger"
// import localizeVideoEvents from "./eventEmitter"

const ytBaseUrl = "https://www.youtube.com/watch?v="
const types = [
    { type: "highestaudio", fileType: ".mp3" },
    { type: "highestvideo", fileType: ".mp4" },
]
const baseUrl1 = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
const baseUrl2 = "https://img.youtube.com/vi/"
const baseUrl2ThumbnailTypes = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"]

//  ----------------- FUNCTIONS -----------------
export const YtdlDownloader = (videoId: string, _type: number, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        let startingLogged = false
        if (!fs.existsSync(`${dir}/${videoId}/`)) fs.mkdirSync(`${dir}/${videoId}/`)
        ytdl(ytBaseUrl + videoId, { quality: types[_type].type })
            .on("progress", (chunkLength: number, downloaded: number, total: number) => {
                // let progress = (downloaded / total) * 100
                if (!startingLogged) logger.info(`Downloading ${videoId}${types[_type].fileType} \n Dir ${dir}`)
                startingLogged = true
            })
            .pipe(fs.createWriteStream(`${dir}/${videoId}/src${types[_type].fileType}`))
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
        cp.exec(`ffmpeg -i ${dir}/${videoId}/src.mp3 -i ${dir}/${videoId}/src.mp4 -c copy ${dir}/${videoId}/output.mp4`, (err, stdout, stderr) => {
            if (err) {
                logger.info(`Error while trying to merge ${videoId} | ${err.message}`)
                return reject({ error: err.message, name: err.name, status: "error" })
            }
            // if (stderr) {
            //     logger.info(`Error in convertToHLS ${stderr}`)
            //     return reject({ error: stderr, status: "error" })
            // }
            const endTime = Date.now()
            logger.info(`Merge complete for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
            return resolve({ status: "merged" })
        })
    })

export const generatePreviewImages = (videoId: string, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        cp.exec(`ffmpeg -i ${dir}/${videoId}/output.mp4 -vf fps=1/10,scale=120:-1 ${dir}/${videoId}/preview_%d.jpg`, (err, stdout, stderr) => {
            if (err) {
                logger.info(`Error while trying to generate preview ${videoId} | ${err.message}`)
                return reject({ error: err.message, name: err.name, status: "error" })
            }
            // if (stderr) {
            //     logger.info(`Error in convertToHLS ${stderr}`)
            // }
            const endTime = Date.now()
            logger.info(`Previews generated for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
            return resolve({ status: "previewgenerated" })
        })
    })

export const convertToHLS = (videoId: string, dir: string) =>
    new Promise((resolve, reject) => {
        const startTime = Date.now()
        if (!fs.existsSync(`${dir}/${videoId}/HLS/`)) fs.mkdirSync(`${dir}/${videoId}/HLS/`)
        cp.exec(
            `bash /home/isolated/rakazone/rakazone-dataupdater/src/workers/localizeVideo/create-vod-hls.sh ${dir}/${videoId}/output.mp4 ${dir}/${videoId}/HLS`,
            (err, stdout, stderr) => {
                if (err) {
                    logger.info(`Error while trying to generate preview ${videoId} | ${err.message}`)
                    return reject({ error: err.message, name: err.name, status: "error" })
                }
                // if (stderr) {
                //     logger.info(`Error in convertToHLS ${stderr}`)
                // }
                const endTime = Date.now()
                logger.info(`HLS Converted for ${videoId} in ${(endTime - startTime) / 1000} seconds`)
                return resolve({ status: "hlsconverted" })
            }
        )
    })

export const downloadThumbnail = (videoId: string, outDir: string) =>
    new Promise(async (resolve, reject) => {
        var download = (uri: string, outDir: string, callback: any) => {
            request.head(uri, function (err: any, res: any, body: any) {
                if (res.statusCode == 404) return callback(false)
                request(uri).pipe(fs.createWriteStream(outDir)).on("close", callback)
            })
        }

        const availableThumbs: Array<string> = []
        if (!fs.existsSync(`${outDir}/${videoId}/`)) fs.mkdirSync(`${outDir}/${videoId}/`)
        download(baseUrl1(videoId), `${outDir}/${videoId}/hq720.jpg`, (c: any) => {
            if (!c) return
            availableThumbs.push(videoId)
        })
        Promise.all(
            baseUrl2ThumbnailTypes.map((type) => {
                download(`${baseUrl2}/${videoId}/${type}.jpg`, `${outDir}/${videoId}/${type}.jpg`, (c: any) => {
                    if (!c) return
                    availableThumbs.push(videoId)
                })
            })
        )
        resolve({ status: "downloaded", availableThumbs })
    })
