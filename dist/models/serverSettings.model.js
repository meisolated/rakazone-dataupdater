"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: Boolean, required: true },
});
