import { Schema } from "mongoose"

export default new Schema(
    {
        key: { type: String, required: true },
        utilization: { type: Number, required: true },
    },
    { timestamps: true }
)
