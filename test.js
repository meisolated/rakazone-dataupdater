import { createWriteStream } from 'fs'
import ytdl from 'ytdl-core'
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

ytdl('https://www.youtube.com/watch?v=uXb4ufZ_QHk')
    .pipe(createWriteStream('video.mp4')).on("progress", (chunkLength, downloaded, total) => {
        const progress = (downloaded / total) * 100
        // download speed
        const download_speed = Math.round(chunkLength / 1024)
        printProgress(`Downloading ${progress.toFixed(2)}% and ${download_speed} mb/s`)
    })