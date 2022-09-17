import moment from "moment"
import { UrlExists } from "../functions/funtions.js"
import { youtube_channel_video_thumbnail_maxresdefault } from "../functions/urlTemplates.js"
import { getVideoStatistics, getYoutubeVidoesList } from "../handler/dataFetcher.js"
import { getUseableAPIKey } from "../helpers/youtubeAPI.js"
import { StreamerData, Videos } from "../models/index.js"
import LoggerUtil from "../util/logger.js"


export let addNewVideos = () =>
    new Promise(async (resolve, reject) => {
        let youtubeApiKey = await getUseableAPIKey()
        let streamerData = await StreamerData.find()
        let _streamerData_ = {}
        streamerData = streamerData.forEach(streamerData => {
            let _streamerData = streamerData.dataValues
            _streamerData_[_streamerData.name] = _streamerData.data
        })
        let videosList = await getYoutubeVidoesList(_streamerData_.yt_channel_id, youtubeApiKey)

        await Promise.all(
            videosList.items.map(async (video) => {   //get video Stats
                if (video.snippet.liveBroadcastContent === "live" || video.snippet.liveBroadcastContent === "upcoming") return
                let videoStats = await getVideoStatistics(video.id.videoId, youtubeApiKey).then(res => res.items[0])
                let final_duration = moment.duration(videoStats.contentDetails.duration).asSeconds()
                let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)

                let type =
                    final_duration <= 60
                        ? "shorts"
                        : final_duration <= 300
                            ? "montage"
                            : final_duration > 300 && final_duration <= 600
                                ? "funny"
                                : final_duration > 3600 && final_duration <= 1200
                                    ? "series"
                                    : "live_stream"

                type = (video.snippet.title.toLowerCase().includes("vlog") || video.snippet.title.toLowerCase().includes("vlogging")) ? "vlog" : type
                let checkVideoInDB = await Videos.findOne({ videoId: video.id.videoId })
                if (checkVideoInDB === null) {
                    let thumbnail = await UrlExists(youtube_channel_video_thumbnail_maxresdefault(video.id.videoId)) ? youtube_channel_video_thumbnail_maxresdefault(video.id.videoId) : `https://raka.zone/assets/img/thumbnail_not_found.png`
                    LoggerUtil.info("Video " + video.snippet.title + " is not in DB - Adding")
                    return await Videos.create({
                        platform: "youtube",
                        videoId: video.id.videoId,
                        title: video.snippet.title,
                        type: type,
                        thumbnail: thumbnail,
                        publishedAt: publishedAt,
                        duration: final_duration,
                        viewCount: videoStats.statistics.viewCount,
                        likeCount: videoStats.statistics.likeCount,
                        commentCount: videoStats.statistics.commentCount,

                    })
                }
            })
        )
        resolve({ status: true })
    })
