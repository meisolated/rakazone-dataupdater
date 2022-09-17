import { Schema } from "mongoose"

export default new Schema({
    platform: { type: String, required: true },
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    viewersCount: { type: Number, required: true },
    publishedAt: { type: Number, required: true },
    status: { type: Boolean, required: true },
    lastUpdate: { type: Number, required: true },
})
