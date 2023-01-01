"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    closeBtnText: { type: String, required: true },
    closeBtnRedirect: { type: String, required: true },
    once: { type: Boolean, required: true },
    expire: { type: Number, required: true },
    status: { type: Boolean, required: true },
});
