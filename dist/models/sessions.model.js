"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    _id: { type: String, required: true },
    expires: { type: Date, required: true },
    data: { type: Object, required: true },
});
