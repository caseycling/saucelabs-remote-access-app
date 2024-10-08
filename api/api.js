const express = require("express")
const cors = require("cors")

const getDevicesStatus = require("./calls/getDevicesStatus")
const validateDescriptor = require("./calls/validateDescriptor")
const openDevice = require("./calls/openDevice")
const closeDevice = require("./calls/closeDevice")

const app = express()
const PORT = 3001

app.use(express.json())

//Blanket-enable cors for every route, i.e. Enable ALL CORS requests
app.use(cors())

app.get("/getDevicesStatus", async (_, res) => {
    const data = await getDevicesStatus()
    res.send(data)
})

app.get("/validateDescriptor/:descriptor", async (req, res) => {
    const data = await validateDescriptor(req.params.descriptor)
    if (typeof data == "object") {
        res.send(data)
    } else {
        res.status(400).send("Bad Request")
    }
})

app.post("/openDevice/:descriptor", async (req, res) => {
    const data = await openDevice(req.params.descriptor, req.body)
    res.send(data) 
})

app.post("/sessions/:deviceSessionId/close", async (req, res) => {
    const response = await closeDevice(req.params.deviceSessionId)

    if (response != 500) {
        res.send("OK")
    } else {
        res.status(500).send("Internal Server Error")
    }
})

app.listen(PORT, _ => {
    console.log(`Example app listening on port ${PORT}`)
})