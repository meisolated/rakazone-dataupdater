import { convertToHLS, generatePreviewImages, mergeAudioAndVideo, YtdlDownloader } from "./workers/localizeVideo/videoProcessor"

const videoId = "PJWemSzExXs"
const dir = "/home/isolated/rakazone/rakazone-dataupdater/log"
YtdlDownloader(videoId, 1, dir).then((res: any) => {
    YtdlDownloader(videoId, 0, dir).then((res: any) => {
        console.log(res)
        mergeAudioAndVideo(videoId, dir)
            .then((res: any) => {
                console.log(res)
                generatePreviewImages(videoId, dir)
                    .then((res: any) => {
                        console.log(res)
                        // convertToHLS(videoId, dir)
                        //     .then((res: any) => {
                        //         console.log(res)
                        //     })
                        //     .catch((err: any) => {
                        //         console.log(err)
                        //     })
                    })
                    .catch((err: any) => {
                        console.log(err)
                    })
            })
            .catch((err: any) => {
                console.log(err.error)
            })
    })
})
