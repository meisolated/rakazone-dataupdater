import { YoutubeAPI } from "../models/index.js"
export const getUseableAPIKey = async () => {
    const allAPIKeys = await YoutubeAPI.find({ utilization: { $lt: 8900 } })
    return allAPIKeys[0].key || false
}

export const updateAPIUsage = async (by, key) => {
    if (!by || !key) return false
    await YoutubeAPI.findOneAndUpdate({ key: key }, { $inc: { utilization: by } })//.then()
    return true
}

export const resetAPIUsage = async (key) => {
    if (!key) return false
    await YoutubeAPI.findOneAndUpdate({ key: key }, { utilization: 0 })
}