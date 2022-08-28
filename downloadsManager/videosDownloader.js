import cp from "child_process"
// import EventEmitter from "events"
import fs, { createWriteStream } from "fs"
import { Op } from "sequelize"
import ytdl from "ytdl-core"
import { Videos } from "../models/Videos.model.js"

// const downloadEmitter = new EventEmitter()
const youtube_base_url = "https://www.youtube.com/watch?v="
const videosList = await Videos.findAll({ where: { duration: { [Op.gt]: 60, [Op.lt]: 60 * 20 } }, raw: true })

const currentTime = () => {
  let date_ob = new Date()
  let date = ("0" + date_ob.getDate()).slice(-2)
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
  let year = date_ob.getFullYear()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()
  return date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}
function clog(msg, n) {
  let _currentTime = currentTime()
  if (n) return console.log("\n" + _currentTime + " - " + msg)
  return console.log(_currentTime + " - " + msg)
}

function printProgress(msg) {
  let _currentTime = currentTime()
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(_currentTime + " - " + msg)
}

const download = (videoId, _type, dir) =>
  new Promise((resolve, reject) => {
    let type = ["highestaudio", "highestvideo"]
    let fileType = [".mp3", ".mp4"]
    let download_speed = 0
    let start_time = Date.now()

    ytdl(youtube_base_url + videoId, { quality: type[_type] })
      .on("progress", (chunkLength, downloaded, total) => {
        const progress = (downloaded / total) * 100
        // download speed
        download_speed = Math.round(chunkLength / 1024)
        printProgress(`Downloading ${progress.toFixed(2)}% and ${download_speed} mb/s`)
      })
      .pipe(
        createWriteStream(`${dir}src${fileType[_type]}`).on("finish", () => {
          const end_time = Date.now()
          clog("Downloaded " + videoId + fileType[_type] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
          resolve({ status: true })
        })
      )
      .on("ready", () => {
        clog("Downloading " + videoId + fileType[_type])
      })
  })

const merge = (videoId, dir) =>
  new Promise((resolve, reject) => {
    let fileType = [".mp3", ".mp4"]
    let start_time = Date.now()
    cp.exec(`ffmpeg -i ${dir}src${fileType[0]} -i ${dir}src${fileType[1]} -c copy ${dir}output.mp4`, (err, stdout, stderr) => {
      if (err) {
        clog(err)
        reject(err)
      }
      const end_time = Date.now()
      clog("Merged " + videoId + fileType[0] + " and " + videoId + fileType[1] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
      resolve({ status: true })
    })
  })

const generatePreviewImages = (videoId, dir) =>
  new Promise((resolve, reject) => {
    let fileType = [".mp3", ".mp4"]
    let start_time = Date.now()
    cp.exec(`ffmpeg -i ${dir}output.mp4 -vf fps=1/10,scale=120:-1 ${dir}image_preview_%d.jpg`, (err, stdout, stderr) => {
      if (err) {
        clog(err)
        reject(err)
      }
      const end_time = Date.now()

      clog("Generated preview image for " + videoId + fileType[0] + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
      resolve({ status: true })
    })
  })

const convertToHLS = (videoId, dir) =>
  new Promise((resolve, reject) => {
    let start_time = Date.now()
    // cp.exec(`ffmpeg -i ${dir}/output.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${dir}/HLS/index.m3u8`, (err, stdout, stderr) => {

    cp.exec(`ffmpeg -i ${dir}/output.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${dir}/HLS/index.m3u8`, (err, stdout, stderr) => {
      if (err) {
        clog(err)
      }
      const end_time = Date.now()
      resolve({ status: true })
      clog("Converting HLS " + videoId + " in " + ((end_time - start_time) / 1000).toFixed(2) + " seconds", true)
    })
  })

const deleteAudioAndVideo = (dir) =>
  new Promise(async (resolve, reject) => {
    if (fs.existsSync(dir + "src.mp4") && fs.existsSync(dir + "src.mp4")) {
      fs.unlinkSync(dir + "src.mp4")
      fs.unlinkSync(dir + "src.mp3")
      //fs.unlinkSync(dir + "output.mp4")
      clog("Deleted audio and video files for")
      resolve({ status: true })
    }
    resolve({ status: true })
  })

const processVideo = (videoId) =>
  new Promise(async (resolve, reject) => {
    try {
      const dir = `../downloads/output/${videoId}/`
      // const dir = ` /home/isolated/rakazone/downloads/output/${videoId}`
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        fs.mkdirSync(dir + "HLS/", { recursive: true })
        let audioDownload = await download(videoId, 0, dir) //this will download audio
        let videoDownload = await download(videoId, 1, dir) //this will download video

        // merge both audio and video
        let mergeAudioAndVideo = await merge(videoId, dir)
        //hls video
        // let HLS = await convertToHLS(videoId, dir)
        // generate preview image
        let previewImages = await generatePreviewImages(videoId, dir)
        let deleteUsedFiles = await deleteAudioAndVideo(dir)

        let interval = setInterval(() => {
          if (audioDownload.status && videoDownload.status && mergeAudioAndVideo.status && previewImages.status && deleteUsedFiles.status) {
            clearInterval(interval)
            resolve()
          }
        }, 500)
      } else {
        clog("Already in downloads folder " + videoId)
        resolve()
      }
    } catch (error) {
      clog(error)
    }
  })

export default function DownloadVideos(settings) {
  // const { downloadUnder, deleteRawAudio, deleteRawVideo, deleteMergedVideo, progress, totalTasks, message } = settings

  let index = 0
  let currentIndex = -100
  const interval = setInterval(() => {
    if (index < videosList.length) {
      if (!videosList[index]) {
        clog("List ended")
        clearInterval(interval)
        return
      } else {
        if (currentIndex == index) return
        currentIndex = index
        processVideo(videosList[currentIndex].videoId)
          .then(() => {
            clog("Downloaded " + index + " videos out of " + videosList.length)
            return index++
          })
          .catch((err) => {
            clog("ERROR WHILE TRYING TO DOWNLOAD ")
            clog(videosList[currentIndex])
            clog(err)
            index++
          })
      }
    } else {
      clog("List ended")
      clearInterval(interval)
      return
    }
  }, 100)
}
