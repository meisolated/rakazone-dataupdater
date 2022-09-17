import { Schema } from "mongoose"

export default new Schema(
    {
        videoId: { type: String, required: true, unique: true },
        platform: { type: String, required: true },
        title: { type: String, required: true, index: true },
        type: { type: String, required: true },
        publishedAt: { type: Number, required: true },
        duration: { type: Number, required: true },
        viewCount: { type: Number, required: true },
        localViews: { type: Number, required: true, default: 0 },
        likeCount: { type: Number, required: true },
        commentCount: { type: Number, required: true },
        status: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)
