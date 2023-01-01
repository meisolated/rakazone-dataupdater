"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
class Mongoose {
    constructor() {
        this.uri = config_1.default.mongoUri;
    }
    connection() {
        return mongoose_1.default.createConnection(this.uri);
    }
}
exports.default = Mongoose;
