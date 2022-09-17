import { Schema } from "mongoose"

interface YoutubeAPI {
    key: string
    utilization: number
}

export default new Schema<YoutubeAPI>(
    {
        key: { type: String, required: true, unique: true },
        utilization: { type: Number, required: true },
    },
    { timestamps: true }
)
