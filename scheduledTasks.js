import schedule from "node-schedule"
import { updateUserData, updateLiveData, updateVideoStats } from "./dataHandler/updater.js"
import { addNewVideos } from "./dataHandler/addNewData.js"
import LoggerUtil from "./util/logger.js"

// export const scheduledTasks = () => {
LoggerUtil.info("Starting Scheduled Tasks")
//run every minute
schedule.scheduleJob("0 */1 * * * *", async function () {
    await updateLiveData()
})

//run every 24 hours
schedule.scheduleJob("0 0 */23 * * *", async function () { //0 0 */23 * * *
    await updateUserData()
    await addNewVideos()
    await updateVideoStats()
})

// }