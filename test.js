// import { Videos } from "./models/Videos.model.js"
// import { Op } from "sequelize"

// let videosList = await Videos.findAll({ where: { duration: { [Op.lt]: 600, } } })
// let videosIdList = []

// videosList.map((video, index) => {
//     videosIdList.push(video.videoId)
//     if (videosList.length - 1 === index) {
//         console.log(JSON.stringify(videosIdList))
//     }
// })

// let array = ["some", "thing"]

// for (let i = 0; i < array.length;) {
//     const element = array[i]
//     console.log(element)

// }

import { Blob } from 'buffer'

const blob = new Blob("./downloads/output/0w52MHi223Q/output.mp4", { type: 'application/mp4' })

console.log(blob)