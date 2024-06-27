//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

// Endpoint used to validate descriptor and/or get information about device
// GET /v1/rdc/devices/augmented/{descriptor}

let validateDescriptor = async (descriptor) => {
    const response = await fetch(`${config.apiEndpoint}/v1/rdc/devices/augmented/${descriptor}`)
    const data = await response.text()

    try {
        return (JSON.parse(data))
    } catch (error) {
        return (data)
    }
}

module.exports = validateDescriptor