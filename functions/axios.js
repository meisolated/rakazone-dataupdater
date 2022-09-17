import axios from "axios"
import { throwError } from "./funtions.js"

/**
 *
 * @param {*} url
 * @returns response of said URL
 */
const axios_simple_get = (url) =>
    new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(async ({ data }) => {
                return resolve(data)
            })
            .catch((err) => resolve(err))
    })




export { axios_simple_get }
