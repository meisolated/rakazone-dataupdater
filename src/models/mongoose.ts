import mongoose from "mongoose"
import config from "../config"

export default class Mongoose {
    private uri: string
    constructor() {
        this.uri = config.mongo.uri
    }
    connection() {
        return mongoose.createConnection(this.uri)
    }
}
