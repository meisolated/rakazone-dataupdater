import analyticsModel from "./analytics.model.js"
import liveModel from "./live.model.js"
import Mongoose from "./mongoose.js"
import popupModel from "./popups.model.js"
import redirectsModel from "./redirects.model.js"
import serverSettingsModel from "./serverSettings.model.js"
import sessionModel from "./sessions.model.js"
import streamerDataModel from "./streamerData.model.js"
import usersModel from "./users.model.js"
import videosModel from "./videos.model.js"
import watchHistoryModel from "./watchHistory.model.js"
import watchLogModel from "./watchLog.model.js"
import youtubeapiModel from "./youtubeapi.model.js"

const connection = new Mongoose().connection()

export const Videos = connection.model("Videos", videosModel)
export const Users = connection.model("User", usersModel)
export const Sessions = connection.model("Sessions", sessionModel)
export const Live = connection.model("Live", liveModel)
export const Popups = connection.model("Popups", popupModel)
export const Redirects = connection.model("Redirects", redirectsModel)
export const ServerSettings = connection.model("ServerSettings", serverSettingsModel)
export const StreamerData = connection.model("StreamerData", streamerDataModel)
export const Analytics = connection.model("Analytics", analyticsModel)
export const WatchHistory = connection.model("WatchHistory", watchHistoryModel)
export const WatchLog = connection.model("WatchLog", watchLogModel)
export const YoutubeAPI = connection.model("YoutubeAPI", youtubeapiModel)
// connection.collection("videos").createIndex({ title: "text" })
