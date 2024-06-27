//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

// Endpoint used to start a manual testing session on the device.
// https://api.us-west-1.saucelabs.com/v1/rdc/manual/devices/{device_descriptor}/open

let openDevice = async (descriptor, payload) => {
    const response = await fetch(`${config.apiEndpoint}/v1/rdc/manual/devices/${descriptor}/open`, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"}
    })

    const data = await response.json();
    return (data)
}

module.exports = openDevice