"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    fromWhere: { type: String, required: true },
    toWhere: { type: String, required: true },
});
