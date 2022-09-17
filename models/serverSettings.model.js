import { Schema } from "mongoose"



export default new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: Boolean, required: true },
})
