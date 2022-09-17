import { isEmptyObject, sleep } from "../functions/funtions.js"
import { getVideoStatistics, getYoutubeCurrentViewers } from "../handler/dataFetcher.js"
import { CheckLoco, CheckYoutube } from "../handler/GetLiveStatus.js"
import { GetLocoUserData, GetYoutubeUserData } from "../handler/GetUserData.js"
import { getUseableAPIKey } from "../helpers/youtubeAPI.js"
import { Live, StreamerData, Videos } from "../models/index.js"
import LoggerUtil from "../util/logger.js"



//update live data
export let updateLiveData = () =>
    new Promise(async (resolve, reject) => {
        let _data = {}
        let currentTime = Date.now()
        let currentLiveData = await Live.find().then(d => d[0])
        let youtubeApiKey = await getUseableAPIKey()
        let settings = { check_in_if_live: 60 * 2 * 100, check_in: 60 * 1000 }


        let streamerData = await StreamerData.find()
        streamerData.forEach(element => {
            _data[element.key] = element.value
        })

        if (currentLiveData.lastUpdate + settings.check_in_if_live < currentTime && currentLiveData.status === true) {
            LoggerUtil.info("Live data needs to be updated")
            //if live update live viewers count and status
            if (currentLiveData.platform === "youtube") {
                let currentViewers = await getYoutubeCurrentViewers(currentLiveData.videoId, youtubeApiKey)
                let updateLiveStatus = isEmptyObject(currentViewers.items[0].liveStreamingDetails)
                    ? { status: false }
                    : { viewersCount: currentViewers.items[0].liveStreamingDetails.concurrentViewers, lastUpdate: currentTime }
                await Live.findOneAndUpdate({ platform: "youtube" }, { ...updateLiveStatus, lastUpdate: currentTime })
                return resolve({ success: true })
            } else if (currentLiveData.platform === "loco") {
                let currentViewers = await CheckLoco(_data.loco_username)
                let updateLiveStatus = currentViewers.status === false ? { status: false } : { viewersCount: currentViewers.viewersCount }
                await Live.findOneAndUpdate({ platform: "youtube" }, { ...updateLiveStatus, lastUpdate: currentTime })
                return resolve({ success: true })
            }
        } else if (currentLiveData.lastUpdate + settings.check_in < currentTime && currentLiveData.status === false) {
            LoggerUtil.info("Currently Offline - Checking if live")
            let youtubeLiveStatus = await CheckYoutube(youtubeApiKey, _data.yt_channel_id)
            let locoLiveStatus = await CheckLoco(_data.loco_username)
            let updateLiveStatus = youtubeLiveStatus.status === true ? youtubeLiveStatus : locoLiveStatus.status === true ? locoLiveStatus : { lastUpdate: currentTime }
            await Live.findOneAndUpdate({ platform: "youtube" }, { ...updateLiveStatus, lastUpdate: currentTime })
            return resolve({ success: true })
        } else {
            LoggerUtil.info("Live data is up to date")
            return resolve({ success: true })
        }
    })

//update user data
export let updateUserData = () =>
    new Promise(async (resolve, reject) => {
        //update user data here
        let _data = {}
        let currentTime = Date.now()
        let streamerData = await StreamerData.find()
        let youtubeApiKey = await getUseableAPIKey()
        streamerData.forEach(element => {
            _data[element.key] = element.value
        })
        //update user data here
        let getLocoUserData = await GetLocoUserData(_data.loco_username)
        let getYoutubeUserData = await GetYoutubeUserData(_data.yt_channel_id, youtubeApiKey)
        // let finalData = Object.assign(getLocoUserData, getYoutubUserData)
        let finalData = getLocoUserData.concat(getYoutubeUserData)

        finalData.forEach(async (data) => {
            let where = Object.keys(data)[0]
            let values = Object.values(data)[0]
            await StreamerData.findOneAndUpdate({ name: where }, { value: values })

        })
        await sleep(3000)
        return resolve({ success: true })

    })

export let updateVideoStats = () =>
    new Promise(async (resolve, reject) => {
        let videosList = await Videos.find()
        //map through videos and update stats\
        await Promise.all(
            videosList.map(async (video) => {
                let youtubeApiKey = await getUseableAPIKey()
                let videoStats = await getVideoStatistics(video.videoId, youtubeApiKey)
                videoStats = videoStats.items[0]

                if (!isEmptyObject(videoStats.contentDetails) && !isEmptyObject(videoStats.statistics)) {
                    if (video.viewCount != videoStats.statistics.viewCount || video.likeCount != videoStats.statistics.likeCount) {
                        LoggerUtil.info("Video stats needs to be updated")
                        return await Videos.findOneAndUpdate(
                            { videoId: video.videoId },
                            {
                                viewCount: videoStats.statistics.viewCount,
                                likeCount: videoStats.statistics.likeCount,
                                commentCount: videoStats.statistics.commentCount,
                            }
                        )
                    }
                }
            })
        )
        resolve()
    })
