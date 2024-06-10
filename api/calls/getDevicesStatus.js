//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

//https://docs.saucelabs.com/dev/api/rdc/#get-devices-status
let getDevicesStatus = async _ => {
    const response = await fetch(`${config.apiEndpoint}/v1/rdc/devices/status`)
    return (await response.json())
}

module.exports = getDevicesStatus;