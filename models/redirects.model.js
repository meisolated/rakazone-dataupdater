import { Schema } from "mongoose"

export default new Schema({
    fromWhere: { type: String, required: true },
    toWhere: { type: String, required: true },
})
