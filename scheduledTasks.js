import schedule from "node-schedule"
import { addNewVideos } from "./dataHandler/addNewData.js"
import { updateLiveData, updateUserData, updateVideoStats } from "./dataHandler/updater.js"
import { YoutubeAPI } from "./models/YoutubeAPI.model.js"
import LoggerUtil from "./util/logger.js"
LoggerUtil.info("Starting Scheduled Tasks")

schedule.scheduleJob("0 */1 * * * *", async function () {
    await updateLiveData()
})

//run every 24 hours
schedule.scheduleJob("0 0 */23 * * *", async function () { //0 0 */23 * * *
    await updateUserData()
    await addNewVideos()
    await updateVideoStats()
})

// schedule every 12:30 PM
schedule.scheduleJob("* 30 12 * * *", async function () {
    LoggerUtil.error("resetting api usage to 0")
    let apis = await YoutubeAPI.findAll()
    await Promise.all(
        apis.map(async (api) => {
            await YoutubeAPI.update({ utilization: 0 }, { where: { id: api.id } })
        })
    )

})



