"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instagram_user_data = exports.youtube_channel_video_statistics = exports.youtube_channel_playlist_list_videos = exports.youtube_channel_playlist_list = exports.youtube_channel_live_stream_viewers_count = exports.youtube_channel_video_list = exports.youtube_channel_statistics = void 0;
let url_prefix = "https://www.googleapis.com/youtube/v3/";
/**
 *
 * @param {String} channel_id
 * @param {String} api_key
 * @returns {"kind", "etag", "pageInfo": { "totalResults" "resultsPerPage" },"items": [{"kind" "etag" "id" "statistics": { "viewCount" "subscriberCount" "hiddenSubscriberCount" "videoCount"}}]
}
 */
const youtube_channel_statistics = (channel_id, api_key) => `${url_prefix}channels?part=statistics&id=${channel_id}&key=${api_key}`;
exports.youtube_channel_statistics = youtube_channel_statistics;
/**
 *
 * @param {String} channel_id
 * @param {String} api_key
 * @returns Url of api
 */
const youtube_channel_video_list = (channel_id, api_key) => `${url_prefix}search?key=${api_key}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=50`;
exports.youtube_channel_video_list = youtube_channel_video_list;
/**
 *
 * @param {String} video_id
 * @param {String} api_key
 * @returns Url of api
 */
const youtube_channel_live_stream_viewers_count = (video_id, api_key) => `${url_prefix}videos?part=liveStreamingDetails&id=${video_id}&fields=items%2FliveStreamingDetails%2FconcurrentViewers&key=${api_key}`;
exports.youtube_channel_live_stream_viewers_count = youtube_channel_live_stream_viewers_count;
/**
 *
 * @param {String} channel_id
 * @param {String} api_key
 * @returns Url of api
 */
const youtube_channel_playlist_list = (channel_id, api_key) => `${url_prefix}playlists?channelId=${channel_id}&maxResults=50&key=${api_key}`;
exports.youtube_channel_playlist_list = youtube_channel_playlist_list;
/**
 *
 * @param {String} playlist_id
 * @param {Strgin} api_key
 * @returns Url of api
 */
const youtube_channel_playlist_list_videos = (playlist_id, api_key) => `${url_prefix}playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlist_id}&key=${api_key}`;
exports.youtube_channel_playlist_list_videos = youtube_channel_playlist_list_videos;
/**
 *
 * @param {String} video_id
 * @param {String} api_key
 * @returns Url of api
 */
const youtube_channel_video_statistics = (video_id, api_key) => `${url_prefix}videos?part=statistics,contentDetails&id=${video_id}&key=${api_key}`;
exports.youtube_channel_video_statistics = youtube_channel_video_statistics;
/**
 *
 * @param {String} username
 * @returns Url of api
 */
const instagram_user_data = (username) => `https://www.instagram.com/${username}/?__a=1`;
exports.instagram_user_data = instagram_user_data;
