import axios from "axios"
import { load } from "cheerio"
import { unescape } from "lodash"
import requestPromise from "request-promise"
import { YoutubeAPI } from "../../models"
import {
    youtube_channel_live_stream_viewers_count,
    youtube_channel_statistics,
    youtube_channel_video_list,
    youtube_channel_video_statistics
} from "./apiTemplates"

/**
 * Get Youtube Channel Videos List
 * @param channelId string
 * @param apiKey string
 * @returns JSON Data
 */
export const getYoutubeChannelVideosList = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 100 } })
        return axios
            .get(youtube_channel_video_list(channelId, apiKey))
            .then((res: any) => resolve({ data: res.data, status: "success" }))
            .catch((err: any) => reject(err))
    })

/**
 * Get Youtube Video Statistics
 * @param videoId string
 * @param apiKey string
 * @returns JSON Data
 */
export const getVideoStatistics = (videoId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        return axios
            .get(youtube_channel_video_statistics(videoId, apiKey))
            .then((res: any) => resolve({ data: res.data, status: "success" }))
            .catch((err: any) => reject(err))
    })

/**
 * Get Youtube Channel Statistics
 * @param channelId string
 * @param apiKey string
 * @returns JSON Data
 */
export const getChannelStatistics = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        return axios
            .get(youtube_channel_statistics(channelId, apiKey))
            .then((res: any) => resolve({ data: res.data, status: "success" }))
            .catch((err: any) => reject(err))
    })

/**
 * Get Youtube Live Stream Current Viewers Count
 * @param videoId : string
 * @param apiKey : string
 * @returns JSON Data
 */
export const getYoutubeLiveStreamCurrentViewers = (videoId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        return axios
            .get(youtube_channel_live_stream_viewers_count(videoId, apiKey))
            .then((res: any) => resolve({ data: res.data, status: "success" }))
            .catch((err: any) => reject(err))
    })

/**
 * Checks if a live stream is going on.
 * @param channelId string
 * @param apiKey string
 * @returns JSON
 */
export const getYoutubeLiveData = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await getYoutubeChannelVideosList(channelId, apiKey)
            .then(async (res: any) => {
                const isLive: any = res.data.items.filter(
                    (videos: any) =>
                        (videos.snippet.liveBroadcastContent === "live" || videos.snippet.liveBroadcastContent === "upcoming") &&
                        videos.id.kind === "youtube#video"
                )
                if (isLive.length > 0) {
                    const liveData = isLive[0]
                    const viewers = await getYoutubeLiveStreamCurrentViewers(liveData.id.videoId, apiKey)
                        .then((res: any) => res.data.items[0].liveStreamingDetails.concurrentViewers)
                        .catch((err: any) => reject({ isLive: false, status: "error", reason: err }))
                    const publishedAt = Math.floor(new Date(liveData.snippet.publishedAt).getTime() / 1000)
                    const data = {
                        title: unescape(liveData.snippet.title),
                        platform: "youtube",
                        videoId: liveData.id.videoId,
                        publishedAt,
                        viewersCount: viewers,
                        status: liveData.snippet.liveBroadcastContent,
                    }
                    resolve({ data, status: "success", isLive: true })
                } else {
                    return resolve({ isLive: false, status: "success" })
                }
            })
            .catch((err: any) => {
                reject({ isLive: false, status: "error", reason: err })
            })
    })

/**
 * 
 * @param locoChannelUrl 
 * @returns Loco Channel Details
 */
export const getLocoData = (locoChannelUrl: any) =>
    new Promise((resolve, reject) => {
        requestPromise(locoChannelUrl)
            .then(async (html: any) => {
                let $ = load(html)
                let loco_followers_count = $("div.css-5dvmrn > span:nth-child(2)").text()
                let loco_views_count = $("div.css-z1h266 > span:nth-child(2)").text()

                return resolve([{ loco_views_count }, { loco_followers_count }])
            })
            .catch((err: any) => reject(err))
    })

/**
 * 
 * @param locoChannelUrl 
 * @returns return if rakazone is live or not
 */
export const getLocoLiveData = (locoChannelUrl: any) =>
    new Promise(async (resolve, reject) => {
        requestPromise(locoChannelUrl)
            .then(async (html: any) => {
                let $ = load(html)
                let data = $("div > div.css-8238fg").text()
                if (!data.includes("isn’t live ")) {
                    let title = $("div.css-d41wqj > div.css-e977ud > div.css-18582wk.e1cv5vcz0").text()
                    let viewers_count = $("div > div.css-pl8wq5").text()
                    let data = {
                        title: title,
                        platform: "loco",
                        videoId: "RakaZone_Gaming",
                        publishedAt: Math.floor(Date.now() / 1000),
                        link: locoChannelUrl,
                        thumbnail: "default_thumbnail()",
                        viewers_count: viewers_count.split(" ")[0] || 0,
                        status: "live",
                        last_update: Date.now(),
                    }
                    return resolve(data)
                } else {
                    return resolve({ status: "offline" })
                }
            })
            .catch((err: any) => resolve({ status: "offline" }))
    })
