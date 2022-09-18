import { Schema } from "mongoose"

interface serverSettings {
    type: string
    state: string
    once: boolean
    schedule: number
    data: object
    abort: boolean
    status: number
    lastMessage: string
    attempts: number
}

export default new Schema<serverSettings>({
    type: { type: String, required: true },
    state: { type: String, require: true },
    once: { type: Boolean, required: true },
    schedule: { type: Number, required: true },
    data: { type: Object, required: true },
    abort: { type: Boolean, required: true },
    status: { type: Number, required: true },
    lastMessage: { type: String, require: true },
    attempts: { type: Number, required: true },
})
