import { Schema } from "mongoose"
export default new Schema(
    {
        userId: { type: String, required: true },
        playing: { type: Boolean, required: true },
        muted: { type: Boolean, required: true },
        volume: { type: Number, required: true },
        ts: { type: Number, required: true },
        ct: { type: Number, required: true },
        vl: { type: Number, required: true },
        vi: { type: String, required: true },
        platform: { type: String, required: true },
        browser: { type: String, required: true },
    },
    { timestamps: true }
)
