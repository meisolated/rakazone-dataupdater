import axios from "axios"
import { YoutubeAPI } from "../../models"
import {
    youtube_channel_live_stream_viewers_count,
    youtube_channel_statistics,
    youtube_channel_video_list,
    youtube_channel_video_statistics,
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
            .then((res: any) => resolve(res.data))
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
            .then((res: any) => resolve(res.data))
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
            .then((res: any) => resolve(res.data))
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
            .then((res: any) => resolve(res.data))
            .catch((err: any) => reject(err))
    })

export const getYoutubeLiveData = (channelId: string, apiKey: string) =>
    new Promise(async (resolve, reject) => {
        await getYoutubeChannelVideosList(channelId, apiKey).then(async (videoList: any) => {
            const isLive: any = videoList.items.filter(
                (videos: any) =>
                    (videos.snippet.liveBroadcast === "live" || videos.snippet.liveBroadcast === "upcoming") && videos.id.kind === "youtube#video"
            )
            if (isLive.length > 0) {
                const viewers = await getYoutubeLiveStreamCurrentViewers(isLive[0].id.videoId, apiKey)
            }
        })
    })
