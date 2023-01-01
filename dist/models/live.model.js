"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    platform: { type: String, required: true },
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    viewersCount: { type: Number, required: true },
    publishedAt: { type: Number, required: true },
    status: { type: Boolean, required: true },
    lastUpdate: { type: Number, required: true },
}, { timestamps: true });
