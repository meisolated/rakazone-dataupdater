import { Schema } from "mongoose"

interface serverSettings {
    type: string
    once: boolean
    time: number
    data: object
    abort: boolean
    status: number
    attempts: number
}

export default new Schema<serverSettings>({
    type: { type: String, required: true },
    once: { type: Boolean, required: true },
    time: { type: Number, required: true },
    data: { type: Object, required: true },
    abort: { type: Boolean, required: true },
    status: { type: Number, required: true },
    attempts: { type: Number, required: true },

})
