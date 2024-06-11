//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

let validateDescriptor = async (descriptor) => {
    const data = await fetch(`${config.apiEndpoint}/v1/rdc/devices/augmented/${descriptor}`)
    const response = await data.text()

    try {
        return (JSON.parse(response))
    } catch (error) {
        return (response)
    }
}

module.exports = validateDescriptor