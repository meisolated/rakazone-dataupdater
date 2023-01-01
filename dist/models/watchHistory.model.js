"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
}, { timestamps: true });
