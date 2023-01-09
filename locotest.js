import { load } from "cheerio"
import requestPromise from "request-promise"

// const locoUrl = "https://loco.gg/streamers/rakazone-gaming?type=live"
const locoUrl = "https://loco.gg/streamers/pitajiplayz?type=live"

requestPromise(locoUrl)
    .then(async (html) => {
        let $ = load(html)
        let data = $("div > div.css-8238fg").text()
        if (!data.includes("isn’t live ")) {
            let title = $("div.css-d41wqj > div.css-j1bv8q > h3").text()
            let viewers_count = $("div > div.css-1172zl0 > span").text()
            return console.log(title, viewers_count)
        } else {
            return console.log("offline")
        }
    })
    .catch((err) => console.log("offline"))