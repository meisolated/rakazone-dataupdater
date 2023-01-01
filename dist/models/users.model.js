"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    loginType: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, required: true },
    createdOn: { type: Number, required: true },
    lastLogin: { type: Number, required: true },
    status: { type: Boolean, required: true },
}, { timestamps: true });
