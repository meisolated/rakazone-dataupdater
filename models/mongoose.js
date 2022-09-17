import mongoose from "mongoose"

export default class Mongoose {
    #uri
    constructor() {
        this.#uri = "mongodb://10.69.69.201:27017/rakazoneDev"
    }
    connection() {
        return mongoose.createConnection(this.#uri)
    }
}
