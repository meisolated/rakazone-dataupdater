import { Schema } from "mongoose"


export default new Schema(
    {
        userId: { type: String, required: true },
        videoId: { type: String, required: true },
    },
    { timestamps: true }
)
