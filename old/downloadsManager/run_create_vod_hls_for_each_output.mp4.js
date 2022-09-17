import cp from "child_process"
import fs from "fs"
// list folders
const folders = fs.readdirSync("../downloads/output/")

folders.map((folder, index) => {
   const hlsPath = "../downloads/output/" + folder + "/HLS"
   const HLSFolder = fs.readdirSync(hlsPath)
   if (!HLSFolder.includes("playlist.m3u8")) {
      const start = Date.now()
      console.log(`Generating HLS for ${folder}`)
      try {
         cp.execSync(`bash ./create-vod-hls.sh ./src/downloads/output/${folder}/output.mp4 ./src/downloads/output/${folder}/HLS`, (error, stdout, stderr) => {
            if (error !== null) {
               console.log(`exec error: ${error}`)
            }
         })
      } catch (error) {
         console.log("Error creating HLS " + folder + error)
      }
      const end = Date.now()
      console.log(`Generating HLS for ${folder} took ${end - start}ms -- ${index + 1}/${folders.length}`)
   }
   else {
      console.log(`HLS for ${folder} already exists`)
   }

})
