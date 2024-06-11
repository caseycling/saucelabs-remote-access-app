const express = require("express")

const getDevicesStatus = require("./calls/getDevicesStatus")
const validateDescriptor = require("./calls/validateDescriptor")

const app = express()
const PORT = 3001

app.get("/getDevicesStatus", async (_, res) => {
    const data = await getDevicesStatus()
    res.send(data)
})

// GET /v1/rdc/devices/augmented/{descriptor}
// Used to validate descriptor and/or get information about device
app.get("/validateDescriptor/:descriptor", async (req, res) => {
    const data = await validateDescriptor(req.params.descriptor)
    if (typeof data == "object") {
        res.send(data)
    } else {
        res.status(400).send("Bad Request")
    }
})

app.listen(PORT, _ => {
    console.log(`Example app listening on port ${PORT}`)
})