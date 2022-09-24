import axios from "axios"
import { YoutubeAPI } from "../../models"
import { youtube_channel_video_list, youtube_channel_video_statistics } from "./apiTemplates"

export const getYoutubeChannelVideosList = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 100 } })
        axios
            .get(youtube_channel_video_list(channelId, apiKey))
            .then((res: any) => resolve(res.data))
            .catch((err: any) => reject(err))
    })

export const getVideoStatistics = (videoId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } })
        axios
            .get(youtube_channel_video_statistics(videoId, apiKey))
            .then((res: any) => resolve(res.data))
            .catch((err: any) => reject(err))
    })

export const getChannelStatistics = (channelId: string, apiKey: string) => new Promise((resolve, reject) => {
})