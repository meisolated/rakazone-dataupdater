import fs from "fs"
import request from "request"
import logger from "../../util/logger"

const baseUrl1 = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`
const baseUrl2 = "https://img.youtube.com/vi/"
const baseUrl2ThumbnailTypes = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"]

var download = (uri: string, outDir: string, callback: any) => {
    request.head(uri, function (err: any, res: any, body: any) {
        if (res.statusCode == 404) return console.log(false, uri)
        request(uri).pipe(fs.createWriteStream(outDir)).on("close", callback)
    })
}

export const downloadThumbnail = (videoId: string, outDir: string) =>
    new Promise(async (resolve, reject) => {
        const availableThumbs: Array<string> = []
        if (!fs.existsSync(`${outDir}${videoId}/`)) fs.mkdirSync(`${outDir}${videoId}/`)
        download(baseUrl1(videoId), `${outDir}${videoId}/hq720.jpg`, () => {})
        Promise.all(
            baseUrl2ThumbnailTypes.map((type) => {
                download(`${baseUrl2}${videoId}/${type}.jpg`, `${outDir}${videoId}/${type}.jpg`, () => {})
            })
        )
        resolve({ status: "downloaded", availableThumbs })
    })
