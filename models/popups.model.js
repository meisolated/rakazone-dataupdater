import { Schema } from "mongoose"

export default new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    closeBtnText: { type: String, required: true },
    closeBtnRedirect: { type: String, required: true },
    once: { type: Boolean, required: true },
    expire: { type: Number, required: true },
    status: { type: Boolean, required: true },
})
