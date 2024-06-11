// NOT PRODUCTION READY. PUTTING CREDENTIALS IN URL IS GENERALLY CONSIDERED NOT SAFE

const SAUCE_USERNAME = "" || process.env.SAUCE_USERNAME
const SAUCE_ACCESS_KEY = "" || process.env.SAUCE_ACCESS_KEY
const ENDPOINT = "" || "api.us-west-1.saucelabs.com"

let config = {
    sauceUsername: SAUCE_USERNAME,
    sauceAccessKey: SAUCE_ACCESS_KEY,
    apiEndpoint: `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@${ENDPOINT}`
}

module.exports = config