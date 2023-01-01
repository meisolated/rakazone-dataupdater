"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocoLiveData = exports.getLocoData = exports.getYoutubeLiveData = exports.getYoutubeLiveStreamCurrentViewers = exports.getChannelStatistics = exports.getVideoStatistics = exports.getYoutubeChannelVideosList = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const lodash_1 = require("lodash");
const request_promise_1 = __importDefault(require("request-promise"));
const models_1 = require("../../models");
const apiTemplates_1 = require("./apiTemplates");
/**
 * Get Youtube Channel Videos List
 * @param channelId string
 * @param apiKey string
 * @returns JSON Data
 */
const getYoutubeChannelVideosList = (channelId, apiKey) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 100 } });
    return axios_1.default
        .get((0, apiTemplates_1.youtube_channel_video_list)(channelId, apiKey))
        .then((res) => resolve({ data: res.data, status: "success" }))
        .catch((err) => reject(err));
}));
exports.getYoutubeChannelVideosList = getYoutubeChannelVideosList;
/**
 * Get Youtube Video Statistics
 * @param videoId string
 * @param apiKey string
 * @returns JSON Data
 */
const getVideoStatistics = (videoId, apiKey) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } });
    return axios_1.default
        .get((0, apiTemplates_1.youtube_channel_video_statistics)(videoId, apiKey))
        .then((res) => resolve({ data: res.data, status: "success" }))
        .catch((err) => reject(err));
}));
exports.getVideoStatistics = getVideoStatistics;
/**
 * Get Youtube Channel Statistics
 * @param channelId string
 * @param apiKey string
 * @returns JSON Data
 */
const getChannelStatistics = (channelId, apiKey) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } });
    return axios_1.default
        .get((0, apiTemplates_1.youtube_channel_statistics)(channelId, apiKey))
        .then((res) => resolve({ data: res.data, status: "success" }))
        .catch((err) => reject(err));
}));
exports.getChannelStatistics = getChannelStatistics;
/**
 * Get Youtube Live Stream Current Viewers Count
 * @param videoId : string
 * @param apiKey : string
 * @returns JSON Data
 */
const getYoutubeLiveStreamCurrentViewers = (videoId, apiKey) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.YoutubeAPI.findOneAndUpdate({ key: apiKey }, { $inc: { utilization: 1 } });
    return axios_1.default
        .get((0, apiTemplates_1.youtube_channel_live_stream_viewers_count)(videoId, apiKey))
        .then((res) => resolve({ data: res.data, status: "success" }))
        .catch((err) => reject(err));
}));
exports.getYoutubeLiveStreamCurrentViewers = getYoutubeLiveStreamCurrentViewers;
/**
 * Checks if a live stream is going on.
 * @param channelId string
 * @param apiKey string
 * @returns JSON
 */
const getYoutubeLiveData = (channelId, apiKey) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getYoutubeChannelVideosList)(channelId, apiKey)
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        const isLive = res.data.items.filter((videos) => (videos.snippet.liveBroadcastContent === "live" || videos.snippet.liveBroadcastContent === "upcoming") &&
            videos.id.kind === "youtube#video");
        if (isLive.length > 0) {
            const liveData = isLive[0];
            const viewers = yield (0, exports.getYoutubeLiveStreamCurrentViewers)(liveData.id.videoId, apiKey)
                .then((res) => res.data.items[0].liveStreamingDetails.concurrentViewers)
                .catch((err) => reject({ isLive: false, status: "error", reason: err }));
            const publishedAt = Math.floor(new Date(liveData.snippet.publishedAt).getTime() / 1000);
            const data = {
                title: (0, lodash_1.unescape)(liveData.snippet.title),
                platform: "youtube",
                videoId: liveData.id.videoId,
                publishedAt,
                viewersCount: viewers,
                status: liveData.snippet.liveBroadcastContent,
            };
            resolve({ data, status: "success", isLive: true });
        }
        else {
            return resolve({ isLive: false, status: "success" });
        }
    }))
        .catch((err) => {
        reject({ isLive: false, status: "error", reason: err });
    });
}));
exports.getYoutubeLiveData = getYoutubeLiveData;
const getLocoData = (locoChannelUrl) => new Promise((resolve, reject) => {
    (0, request_promise_1.default)(locoChannelUrl)
        .then((html) => __awaiter(void 0, void 0, void 0, function* () {
        let $ = (0, cheerio_1.load)(html);
        let loco_followers_count = $("div.css-5dvmrn > span:nth-child(2)").text();
        let loco_views_count = $("div.css-z1h266 > span:nth-child(2)").text();
        return resolve([{ loco_views_count }, { loco_followers_count }]);
    }))
        .catch((err) => reject(err));
});
exports.getLocoData = getLocoData;
const getLocoLiveData = (locoChannelUrl) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    (0, request_promise_1.default)(locoChannelUrl)
        .then((html) => __awaiter(void 0, void 0, void 0, function* () {
        let $ = (0, cheerio_1.load)(html);
        let data = $("div > div.css-8238fg").text();
        if (!data.includes("isn’t live ")) {
            let title = $("div.css-d41wqj > div.css-e977ud > div.css-18582wk.e1cv5vcz0").text();
            let viewers_count = $("div > div.css-pl8wq5").text();
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
            };
            return resolve(data);
        }
        else {
            return resolve({ status: "offline" });
        }
    }))
        .catch((err) => resolve({ status: "offline" }));
}));
exports.getLocoLiveData = getLocoLiveData;
