"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const localizeVideoEvents = new events_1.default();
localizeVideoEvents.on("videoDownloader", (data) => {
    // if()
});
exports.default = localizeVideoEvents;
