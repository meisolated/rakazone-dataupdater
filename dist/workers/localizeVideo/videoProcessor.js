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
exports.downloadThumbnail = exports.convertToHLS = exports.generatePreviewImages = exports.mergeAudioAndVideo = exports.YtdlDownloader = void 0;
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const request_1 = __importDefault(require("request"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const logger_1 = __importDefault(require("../../util/logger"));
// import localizeVideoEvents from "./eventEmitter"
const ytBaseUrl = "https://www.youtube.com/watch?v=";
const types = [
    { type: "highestaudio", fileType: ".mp3" },
    { type: "highestvideo", fileType: ".mp4" },
];
const baseUrl1 = (videoId) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
const baseUrl2 = "https://img.youtube.com/vi/";
const baseUrl2ThumbnailTypes = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"];
//  ----------------- FUNCTIONS -----------------
const YtdlDownloader = (videoId, _type, dir) => new Promise((resolve, reject) => {
    const startTime = Date.now();
    let startingLogged = false;
    if (!fs_1.default.existsSync(`${dir}/${videoId}/`))
        fs_1.default.mkdirSync(`${dir}/${videoId}/`);
    (0, ytdl_core_1.default)(ytBaseUrl + videoId, { quality: types[_type].type })
        .on("progress", (chunkLength, downloaded, total) => {
        // let progress = (downloaded / total) * 100
        if (!startingLogged)
            logger_1.default.info(`Downloading ${videoId}${types[_type].fileType} \n Dir ${dir}`);
        startingLogged = true;
    })
        .pipe(fs_1.default.createWriteStream(`${dir}/${videoId}/src${types[_type].fileType}`))
        .on("finish", () => {
        const TimeTook = (Date.now() - startTime) / 1000;
        logger_1.default.info(`Downloaded ${videoId}${types[_type].fileType} in ${TimeTook} seconds  \n Dir ${dir}`);
        return resolve({ status: "downloaded" });
    })
        .on("error", (err) => {
        logger_1.default.info(`Error while trying to download ${videoId} | ${err.message}`);
        return reject({ message: err.message, name: err.name, status: "error" });
    });
});
exports.YtdlDownloader = YtdlDownloader;
const mergeAudioAndVideo = (videoId, dir) => new Promise((resolve, reject) => {
    const startTime = Date.now();
    child_process_1.default.exec(`ffmpeg -i ${dir}/${videoId}/src.mp3 -i ${dir}/${videoId}/src.mp4 -c copy ${dir}/${videoId}/output.mp4`, (err, stdout, stderr) => {
        if (err) {
            logger_1.default.info(`Error while trying to merge ${videoId} | ${err.message}`);
            return reject({ error: err.message, name: err.name, status: "error" });
        }
        // if (stderr) {
        //     logger.info(`Error in convertToHLS ${stderr}`)
        //     return reject({ error: stderr, status: "error" })
        // }
        const endTime = Date.now();
        logger_1.default.info(`Merge complete for ${videoId} in ${(endTime - startTime) / 1000} seconds`);
        return resolve({ status: "merged" });
    });
});
exports.mergeAudioAndVideo = mergeAudioAndVideo;
const generatePreviewImages = (videoId, dir) => new Promise((resolve, reject) => {
    const startTime = Date.now();
    child_process_1.default.exec(`ffmpeg -i ${dir}/${videoId}/output.mp4 -vf fps=1/10,scale=120:-1 ${dir}/${videoId}/preview_%d.jpg`, (err, stdout, stderr) => {
        if (err) {
            logger_1.default.info(`Error while trying to generate preview ${videoId} | ${err.message}`);
            return reject({ error: err.message, name: err.name, status: "error" });
        }
        // if (stderr) {
        //     logger.info(`Error in convertToHLS ${stderr}`)
        // }
        const endTime = Date.now();
        logger_1.default.info(`Previews generated for ${videoId} in ${(endTime - startTime) / 1000} seconds`);
        return resolve({ status: "previewgenerated" });
    });
});
exports.generatePreviewImages = generatePreviewImages;
const convertToHLS = (videoId, dir) => new Promise((resolve, reject) => {
    const startTime = Date.now();
    if (!fs_1.default.existsSync(`${dir}/${videoId}/HLS/`))
        fs_1.default.mkdirSync(`${dir}/${videoId}/HLS/`);
    child_process_1.default.exec(`bash /home/isolated/rakazone/rakazone-dataupdater/src/workers/localizeVideo/create-vod-hls.sh ${dir}/${videoId}/output.mp4 ${dir}/${videoId}/HLS`, (err, stdout, stderr) => {
        if (err) {
            logger_1.default.info(`Error while trying to generate preview ${videoId} | ${err.message}`);
            return reject({ error: err.message, name: err.name, status: "error" });
        }
        // if (stderr) {
        //     logger.info(`Error in convertToHLS ${stderr}`)
        // }
        const endTime = Date.now();
        logger_1.default.info(`HLS Converted for ${videoId} in ${(endTime - startTime) / 1000} seconds`);
        return resolve({ status: "hlsconverted" });
    });
});
exports.convertToHLS = convertToHLS;
const downloadThumbnail = (videoId, outDir) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    var download = (uri, outDir, callback) => {
        request_1.default.head(uri, function (err, res, body) {
            if (res.statusCode == 404)
                return callback(false);
            (0, request_1.default)(uri).pipe(fs_1.default.createWriteStream(outDir)).on("close", callback);
        });
    };
    const availableThumbs = [];
    if (!fs_1.default.existsSync(`${outDir}/${videoId}/`))
        fs_1.default.mkdirSync(`${outDir}/${videoId}/`);
    download(baseUrl1(videoId), `${outDir}/${videoId}/hq720.jpg`, (c) => {
        if (!c)
            return;
        availableThumbs.push(videoId);
    });
    Promise.all(baseUrl2ThumbnailTypes.map((type) => {
        download(`${baseUrl2}/${videoId}/${type}.jpg`, `${outDir}/${videoId}/${type}.jpg`, (c) => {
            if (!c)
                return;
            availableThumbs.push(videoId);
        });
    }));
    resolve({ status: "downloaded", availableThumbs });
}));
exports.downloadThumbnail = downloadThumbnail;
