import { Schema } from "mongoose"

export default new Schema(
    {
        ip: { type: String, required: true },
        city: { type: String, required: false },
        region: { type: String, required: false },
        country: { type: String, required: false },
        postal: { type: String, required: false },
        timezone: { type: String, required: false },
        ispAddress: { type: String, required: false },
        page: { type: String, required: false },
        referrer: { type: String, required: false },
        deviceWidth: { type: Number, required: false },
        deviceHeight: { type: Number, required: false },
        deviceName: { type: String, required: false },
        deviceColorDepth: { type: Number, required: false },
        deviceOSName: { type: String, required: false },
        deviceOSVersion: { type: String, required: false },
        browserName: { type: String, required: false },
        browserVersion: { type: String, required: false },
        browserWidth: { type: Number, required: false },
        browserHeight: { type: Number, required: false },
    },
    { timestamps: true }
)
