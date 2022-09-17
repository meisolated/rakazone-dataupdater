import { Schema } from "mongoose"


export default new Schema({
    _id: { type: String, required: true },
    expires: { type: Date, required: true },
    data: { type: Object, required: true },
})
