//node-fetch@3 only supports ES6 imports. This works around it by async loading the module.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require("../config.js")

//Endpoint used to start a manual testing session on the device.
//https://api.us-west-1.saucelabs.com/v1/rdc/manual/devices/{device_descriptor}/open

//POST a request to this endpoint with a payload like:
// {testReportName: "API Test", tunnel: null, webRtcEnabled: false}

/*
Upon successful device open, a a response will be sent like so:
{
    "deviceSessionId": "c974f136-d261-4ddb-944d-ec42030842f1",
    "webRtcCredentials": {
        "roomName": "aa8be092-9063-4aec-9139-8c52b28de2c8",
        "accessToken": "eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhiNzZmMmU3MTkzOTc4YmFjNjkyYmY5MDZhYTQzOGQ2IiwiZXhwIjoxNzE4MjIyNDcyLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhYThiZTA5Mi05MDYzLTRhZWMtOTEzOS04YzUyYjI4ZGUyYzgtdmlld2VyIiwidmlkZW8iOnsicm9vbSI6ImFhOGJlMDkyLTkwNjMtNGFlYy05MTM5LThjNTJiMjhkZTJjOCJ9fSwianRpIjoiU0s4Yjc2ZjJlNzE5Mzk3OGJhYzY5MmJmOTA2YWE0MzhkNi0xNzE4MTM2MDY0Iiwic3ViIjoiQUNkYTUyNThkN2E3ZDNiOTM1YWE4MzJjYzVkN2YwNzAxNiJ9.XSdtcdkNtLZ3V-evDokyIuZ_ZFqz7_UL_nr5ahfQPhY"
    },
    "testReportId": "f5c2c62feb5049dd9216cbec8a27e2d9",
    "testReportName": "https://google.com"
}

deviceSessionId - Internal session ID to interact with device session
webRtcCredentials - come back to. Is this sent when webrtc = false?
testReportId - Public test session ID, used to view job in Sauce Labs - https://app.saucelabs.com/tests/{testSessionId}
testReportName - Name of test session
*/
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