interface config {
    HLSDir: string
    thumbnailsDir: string
    assetsDir: string
}

export default <config>{
    mongoUri: process.env.BUILD_TYPE == "production" ? "mongodb://10.69.69.201:27017/rakazone" : "mongodb://10.69.69.201:27017/rakazoneDev",
    HLSDir: "/home/isolated/rakazone/downloads/output/HLS",
    thumbnailsDir: "/home/isolated/rakazone/downloads/thumbnails",
    assetsDir: "/home/isolated/rakazone/downloads/assets",
}
