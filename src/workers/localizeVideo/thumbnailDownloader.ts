import fs from "fs"
import https from "https"
import Transform from "stream"
import logger from "../../util/logger"

const baseUrl1 = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
const baseUrl2 = "https://img.youtube.com/vi/"
const baseUrl2ThumbnailTypes = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"]

export const downloadThumbnail = (videoId: string, outDir: string) =>
    new Promise(async (resolve, reject) => {
        const availableThumbs: Array<string> = []
        const request1 = https.request(baseUrl1(videoId), (response) => {
            if (response.statusCode == 404) return
            availableThumbs.push("hq720")
            var data = new Transform()
            response.on("data", (chunk) => {
                data.push(chunk)
            })
            response.on("end", () => {
                fs.writeFileSync(`${outDir}${videoId}-hq720.jpg`, data.read())
            })
        })
        request1.end()
        request1.on("error", (e) => {
            logger.info(`Error while trying to download ${videoId} thumbnail | hq720.jpg`)
        })
        Promise.all(
            baseUrl2ThumbnailTypes.map((type) => {
                // -----------------------------------------.....................------------------------------//
                const request = https.request(`${baseUrl2}${videoId}/${type}.jpg`, (response) => {
                    if (response.statusCode == 404) return
                    availableThumbs.push(type)
                    let data = new Transform()
                    response.on("data", (chunk) => {
                        // @ts-ignore
                        data.push(chunk)
                    })
                    response.on("end", () => {
                        // @ts-ignore
                        fs.writeFileSync(`${outDir}${videoId}-${type}.jpg`, data.read())
                    })
                })
                request.end()
                request.on("error", (e) => {
                    logger.info(`Error while trying to download ${videoId} thumbnail | ${type}.jpg `)
                })
            })
        )

        resolve({ status: "downloaded", availableThumbs })
    })


