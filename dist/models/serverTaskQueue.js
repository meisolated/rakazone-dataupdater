"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    type: { type: String, required: true },
    state: { type: String, require: true },
    once: { type: Boolean, required: true },
    schedule: { type: Number, required: true },
    data: { type: Object, required: true },
    abort: { type: Boolean, required: true },
    status: { type: Number, required: true },
    lastMessage: { type: String, require: true },
    attempts: { type: Number, required: true },
});
