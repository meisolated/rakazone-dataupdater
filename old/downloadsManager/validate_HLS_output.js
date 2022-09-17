import cp from "child_process"
import fs from "fs"
import { Videos } from "../models/Videos.model.js"
const folders = fs.readdirSync("../downloads/output/")
folders.map(async (folder, index) => {
    const hlsPath = "../downloads/output/" + folder + "/HLS"
    const HLSFolder = fs.readdirSync(hlsPath)
    if (!HLSFolder.includes("playlist.m3u8")) {
        console.log(folder + " invalid")

    } else {
        let video = await Videos.findOne({ where: { videoId: folder } })
        if (video) {
            video.platform = "local"
            video.save().then((x) => {
                console.log(folder + " saved")
            })
        } else {
            console.log(folder + " not found")
        }
    }
})