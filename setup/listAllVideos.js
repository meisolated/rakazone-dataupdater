import axios from "axios"
import moment from "moment"
import { youtube_channel_video_statistics } from "../functions/apiTemplates.js"
import { sleep, throwError } from "../functions/funtions.js"
import { getUseableAPIKey, updateAPIUsage } from "../helpers/youtubeAPI.js"
import { Videos } from "../models/index.js"



let first = 0
let videos_count = 0
async function get_videos(pageToken) {
    let youtubeApiKey = await getUseableAPIKey()
    if (first === 1 && pageToken == undefined) return
    first = 1
    let q = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=UCRj_BU95SebaRi2FziXEoTg&part=snippet,id&order=date&maxResults=50`
    let request = pageToken ? q + `&pageToken=${pageToken}` : q

    //get all videos
    axios
        .get(request)
        .then(async (data) => {
            let _data = data.data.items
            let videos = _data.filter((video) => video.id.kind === "youtube#video")
            await Promise.all(
                videos.map(async (video) => {
                    //now for each video get that video other detials
                    axios
                        .get(youtube_channel_video_statistics(video.id.videoId, youtubeApiKey))
                        .then(async (other) => {
                            await updateAPIUsage(1, youtubeApiKey)
                            let final_data = other.data.items[0]
                            if (!final_data.contentDetails) {
                                console.log(other)
                                return process.exit()
                            }
                            let final_duration = moment.duration(final_data.contentDetails.duration).asSeconds()
                            let publishedAt = Math.floor(new Date(video.snippet.publishedAt).getTime() / 1000)
                            let type =
                                final_duration <= 120
                                    ? "shorts"
                                    : final_duration <= 300
                                        ? "montage"
                                        : final_duration > 300 && final_duration <= 600
                                            ? "funny"
                                            : final_duration > 3600 && final_duration <= 1200
                                                ? "series"
                                                : "live_stream"

                            type = (video.snippet.title.toLowerCase().includes("vlog") || video.snippet.title.toLowerCase().includes("vlogging")) ? "vlog" : type
                            await Videos.create({
                                videoId: video.id.videoId,
                                platform: "youtube",
                                title: video.snippet.title,
                                type: type,
                                publishedAt: publishedAt,
                                duration: final_duration,
                                localViews: 0,
                                viewCount: final_data.statistics.viewCount,
                                likeCount: final_data.statistics.likeCount,
                                commentCount: final_data.statistics.commentCount,
                                status: true

                            }).then(() => videos_count++)
                        })
                        .catch((err) => throwError(err + " channel Statistics Error " + JSON.stringify(video)))
                })
            )
            console.log("Added " + videos_count + " videos")
            await sleep(5000)
            await updateAPIUsage(100, youtubeApiKey)
            return get_videos(data.data.nextPageToken)
        })
        .catch((err) => throwError(err + " videos list error"))
}

get_videos(undefined)
