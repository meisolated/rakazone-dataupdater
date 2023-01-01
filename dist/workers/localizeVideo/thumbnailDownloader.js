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
exports.downloadThumbnail = void 0;
const fs_1 = __importDefault(require("fs"));
const request_1 = __importDefault(require("request"));
const baseUrl1 = (videoId) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
const baseUrl2 = "https://img.youtube.com/vi/";
const baseUrl2ThumbnailTypes = ["maxresdefault", "mqdefault", "sddefault", "hqdefault", "default", "0", "1", "2", "3", "4"];
var download = (uri, outDir, callback) => {
    request_1.default.head(uri, function (err, res, body) {
        if (res.statusCode == 404)
            return console.log(false, uri);
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        (0, request_1.default)(uri).pipe(fs_1.default.createWriteStream(outDir)).on("close", callback);
    });
};
const downloadThumbnail = (videoId, outDir) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const availableThumbs = [];
    if (!fs_1.default.existsSync(`${outDir}${videoId}/`))
        fs_1.default.mkdirSync(`${outDir}${videoId}/`);
    download(baseUrl1(videoId), `${outDir}${videoId}/hq720.jpg`, () => { });
    // -----------------------------------------.....................------------------------------//
    Promise.all(baseUrl2ThumbnailTypes.map((type) => {
        download(`${baseUrl2}${videoId}/${type}.jpg`, `${outDir}${videoId}/${type}.jpg`, () => { });
    }));
    resolve({ status: "downloaded", availableThumbs });
}));
exports.downloadThumbnail = downloadThumbnail;
