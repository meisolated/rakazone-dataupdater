"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const winston_1 = __importDefault(require("winston"));
const dateNtime = () => {
    let time = (0, moment_1.default)().format("DD-MM-YYYY hh:mm:ss");
    return time;
};
var _logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.colorize({
        all: true,
    }), winston_1.default.format.printf((data) => `[${dateNtime()}] [${data.level}] : ${data.message}`)),
    transports: [
        new winston_1.default.transports.Console({
            level: "silly",
        }),
        new winston_1.default.transports.File({
            level: "silly",
            filename: "./log/ServerData.log",
        }),
    ],
});
var logger = {
    silly: (message) => {
        _logger.log("silly", message);
    },
    debug: (message) => {
        _logger.log("debug", message);
    },
    verbose: (message) => {
        _logger.log("verbose", message);
    },
    info: (message) => {
        _logger.log("info", message);
    },
    warn: (message) => {
        _logger.log("warn", message);
    },
    error: (message) => {
        _logger.log("error", message);
    },
};
exports.default = logger;
