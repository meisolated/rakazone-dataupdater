// import { Videos } from "./models/Videos.model.js"
// import { Op } from "sequelize"

// let videosList = await Videos.findAll({ where: { duration: { [Op.lt]: 600, [Op.gt]: 60, } } })
// let videosIdList = []

// videosList.map((video, index) => {
//     videosIdList.push(video.videoId)
//     if (videosList.length - 1 === index) {
//         console.log(videosIdList.length)
//         console.log(JSON.stringify(videosIdList))
//     }
// })

// get list of folders in a folder
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


let array = [
    "zY_LzVdDWMA",
    "rEssiE5CJM0",
    "GcimpIAO36M",
    "KTGLaS5-Whg",
    "Z6nltfokuRM",
    "RIK3KhOUILA",
    "A7B4-7XJgss",
    "r46xONYRI6I",
    "0w52MHi223Q",
    "SLT1mWCr08s",
    "Jn8staToepo",
    "Ax1GhQL-TPI",
    "9WvIxpELghA",
    "bRtBOXKTQsU",
    "WPNXhXDDxFM",
    "iAaQeZM93bE",
    "n-qBtgsroMQ",
    "pvwWz3ehiVw",
    "RVUd92a6Yio",
    "QEONbgZMJRA",
    "FKiV31CCZ1c",
    "0dTSpgmDlDE",
    "g8BXg4fBkMk",
    "GsK6rdHFeV8",
    "9kOaN5KRg7Y",
    "5prumknV3pM",
    "EpXq0GlkxXo",
    "X3PN3vYlAvU",
    "KoumLLCPKYk",
    "H4EbA_qtzb4",
    "QroygeZ-20c",
    "fR8zAb3vhtA",
    "ofJrniOYRjM",
    "YBpE9SvTcvY",
    "9bd73JJpJ7I",
    "_Pjk1jko96o",
    "K3SjsgrxwQI",
    "7IPZBjC2Efg",
    "y_bHw4QAY30",
    "6_HR0uxvEn8",
    "M12X89b5YUY",
    "kvK3hlq1l8o",
    "UFtWm-dzCE0",
    "BVJ4Jb61fUo",
    "1tYxD3nHupM",
    "3Zw_h4u0ngY",
    "T2neFlmgerE",
    "9i6_LoWosWA",
    "OB3QWLPbeMc",
    "YjsM6R7wUew",
    "5BaERXuhbvY",
    "N_g5FVK_CDc",
    "km0okOXpLUU",
    "4YBuYz-ZHgg",
    "68yUYkdCT5E",
    "pc0u_VdGtxU",
    "ZBEMCNjQTLQ",
    "ZrMKgJfyOpg",
    "_lzVF72UlHo",
    "1vftFlJ4-Qw",
    "JiYPf1XNZ9Q",
    "oTXz6ZtbQtM",
    "fV2UEXdjYG4",
    "fnkPuyJHNlE",
    "_XXdu7uZdC4",
    "e2I4vnAG0b0",
    "WQmRGa2C4GE",
    "ooY0W8sU1dk",
    "wyTz1_VHJ8E",
    "JOhIwrxGyjo",
    "U94OSqX83y4",
    "K_aJwVAdKmc",
    "h_9rLR1C054",
    "Jg1bm2leOl4",
    "uLvG7hkhE68",
    "EIsdkBk7bbY",
    "MdW4Bhl_SoI",
    "HlpgSobC184",
    "o6RQO0Tpg4o",
    "-L3jQCdAKwU",
    "eyHikOQpt54",
    "AnlVCSsX6gE",
    "Cls7meFAdS0",
    "T-eHg394rK4",
    "abGVgjNqt2k",
    "tUSAto4DwUw",
    "c_kGGjt03OM",
    "p-XDWLaGbi8",
    "FhVtidiVT3A",
    "p76PIOfo17U",
    "8PFDJaAMOpc",
    "ABkctmkhmgo",
    "4mWTixIhR0Q",
    "AF7GBXg0P4M",
    "l5chXlV0kD0",
    "1TBfQri17B4",
    "BX6VKTfxlSA",
    "zxwWBThwQz0",
    "GnHZ_qz1gPo",
    "RAFsaN7p9XE",
    "gs9bqwAlZBA",
    "cHyuEdtOGeg",
    "aGB8QLiAwlY",
    "mASVEgYoxmk",
    "kQMRCOJXSZ0",
    "GltD9CXkNXM",
    "SJadvUHUVBw",
    "yhcDEq69lCs",
    "_GoUw7YxNw4",
    "3-nLxTMTjrQ",
    "WTydAQXVtB4",
    "AqapvtrgiRk",
    "USK1XeHOW98",
    "DY5hhwWUVtw",
    "YZUlpXRWaAg",
    "ipJmfcxrL0Q",
    "-F_bGUZa8Kc",
    "B2BHFg4ytdU",
    "8vlTSi9RmLk",
    "nqyPoAro4HQ",
    "Y6OqKqpb_9Y",
    "63Qx7yhq_m4",
    "GFjO14yF1d4",
    "oB4a_aaqkvY",
    "QuK48xmUsnQ",
    "ZGgUUugyXsk",
    "ZOJSaU_QZzQ",
    "_NQugvbug_A",
    "5qS72BKhCjE",
    "k7U_UvbvqTc",
    "DVoWrN4G1LQ",
    "zhm_aDaBDx0",
    "68EpyqXTE9U",
    "k3MVqZbl8H0",
    "7OqspO45Aso",
    "lDbaKrZA80A",
    "1MKFhhpdCiE",
    "yIQq94b6YRk",
    "VN83KG9KvVg",
    "3wn9pqQdk6o",
    "oUWjlLY6gMU",
    "Ye6pSv2A7-E",
    "Psx23qC7WmM",
    "FPZkFjF_aiw",
    "auFRnD5QnPY",
    "NY6djHpoOI0",
    "edxCYsLuzvs",
    "1JLQTLYU6_s",
    "NhZ5PBDALFw",
    "WGcgbmIzixY",
    "tfOLHtzXS4c",
    "EFls1uBzIP4",
    "yn6PKmifIxc",
    "aV9CCfSmgRI",
    "Td4uXOHzXoU",
    "j_SpAmV_VCI",
    "08LEL0YQroo",
    "PRpjO7Vh0sM",
    "91tYYJjDYEM",
    "YaQEY_lRaQ8",
    "FYatfhgaNXU",
    "TNT2JLqEfT0",
    "DVfecPu1vyo",
    "eS4iGVNkwJ0",
    "vDDryKFOmZY",
    "JaACbmX5BgM",
    "56KQlHy8BhM",
    "jPW-WxctaqA",
    "g5t2KWQQ0Bo",
    "1VzdzeW3wyk",
    "xKGSM0M-hEk",
    "MQdSYQGkRuI",
    "MR0coMzqq5U",
    "xqann191kbY",
    "2N8ETofz3Cg",
    "aokcjZSMAEE",
    "DqmrBUjCaik",
    "TyBP7QNh4WA",
    "3dYll16qzm8",
    "Pil8XuW6X74",
    "5DZz6m7eDbs",
]
const directoryPath = path.join(__dirname, 'downloads/output/')

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }
    let x = 0
    files.forEach(function (file) {
        x++
        if (!array.includes(file)) {
            console.log("------" + file)
            fs.rmSync(directoryPath + file, { recursive: true, force: true })
        }
        else {
            if (fs.existsSync(directoryPath + file + "/HLS")) {
                fs.rmSync(directoryPath + file + "/HLS", { recursive: true, force: true })
            }
        }
        console.log(x)
    })
})