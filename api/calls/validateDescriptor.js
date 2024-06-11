//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

// GET /v1/rdc/devices/augmented/{descriptor}
// Used to validate descriptor and/or get information about device
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