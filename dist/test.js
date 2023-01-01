"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./workers/helpers");
const channelId = "UCRj_BU95SebaRi2FziXEoTg";
const apiKey = "AIzaSyCSGU0pi0oRrS_uI8JURwBQHTMcDJj9ZZs";
const videoId = "dMroRd_LGdY";
const locoUrl = "https://loco.gg/streamers/RakaZone_Gaming?type=live";
// getYoutubeLiveData(channelId, apiKey).then((data: any) => {
//     console.log("getYoutubeLiveData")
//     console.log(data)
// }).catch((err: any) => {
//     console.log(err)
// })
// getChannelStatistics(channelId, apiKey).then((data: any) => {
//     console.log("getChannelStatistics")
//     console.log(data)
// }).catch((err: any) => {
//     console.log(err)
// })
// getVideoStatistics(videoId, apiKey).then((data: any) => {
//     console.log("getVideoStatistics")
//     console.log(data)
// }).catch((err: any) => {
//     console.log(err)
// })
// getYoutubeChannelVideosList(channelId, apiKey).then((data: any) => {
//     console.log("getYoutubeChannelVideosList")
//     console.log(data)
// }).catch((err: any) => {
//     console.log(err)
// })
(0, helpers_1.getLocoLiveData)(locoUrl)
    .then((res) => {
    console.log(res);
})
    .catch((err) => {
    console.log(err);
});
(0, helpers_1.getLocoData)(locoUrl)
    .then((res) => {
    console.log(res);
})
    .catch((err) => {
    console.log(err);
});
