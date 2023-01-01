"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    videoId: { type: String, required: true, unique: true },
    platform: { type: String, required: true },
    title: { type: String, required: true, index: true },
    type: { type: String, required: true },
    publishedAt: { type: Number, required: true },
    duration: { type: Number, required: true },
    viewCount: { type: Number, required: true },
    localViews: { type: Number, required: true },
    likeCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
    status: { type: Boolean, required: true },
}, { timestamps: true });
