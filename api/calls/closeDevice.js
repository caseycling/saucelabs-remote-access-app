//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

//Endpoint used to close a manual testing session on the device
//POST https://api.us-west-1.saucelabs.com/v1/rdc/manual/sessions/{deviceSessionId}/close

let closeDevice = async (deviceSessionId) => {
    const response = await fetch(`${config.apiEndpoint}/v1/rdc/manual/sessions/${deviceSessionId}/close`, {
        method: "POST"
    })

    return ((response.ok) ? 204 : 500)
}

module.exports = closeDevice