// import _ from "lodash"
// import { Videos } from "./models/Videos.model.js"
// const getAllVideos = await Videos.findAll()

import axios from "axios"

// getAllVideos.forEach(element => {
//     element.title = _.unescape(element.title)
//     element.save()
// })

var x = 0
var done = false
setInterval(() => {
    x++
    if(done) return done = false
    console.log(x)
    axios.get("https://raka.zone").then(x =>{done = true})
}, 1)
